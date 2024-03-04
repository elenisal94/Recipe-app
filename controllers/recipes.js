const Recipe = require('../models/recipe');
const { getCountryInfo, countryInfoData } = require('../utils/countryInfo');
const { expandOrShortenUnit, metricShorthandData, imperialShorthandData } = require('../utils/shorthand');
const { convertToMetric, convertToImperial } = require('../utils/convertUnitAmount');
const catchAsync = require('../helper/catchAsync');
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
}

module.exports.renderNewForm = (req, res) => {
    res.render('recipes/new', { countryInfoData, metricShorthandData, imperialShorthandData });
}

module.exports.createRecipe = async (req, res, next) => {
    const recipeData = req.body.recipe;
    recipeData.author = req.user._id;
    const selectedCountryCode = recipeData.countryCode;
    const countryData = getCountryInfo(selectedCountryCode);
    recipeData.countryFullname = countryData.countryFullname;
    recipeData.countryFlag = countryData.countryFlag;

    const selectedSystem = recipeData.measurementSystem;
    const ingredientsArray = recipeData.ingredients ? recipeData.ingredients : [recipeData.ingredients];

    if (Array.isArray(ingredientsArray)) {
        const conversionPromises = ingredientsArray.map(async (ingredient) => {
            const conversionResult = await convertToMetric(ingredient.amount, ingredient.measurementShorthand, selectedSystem);
            ingredient.amount = conversionResult.convertedAmount;
            ingredient.measurementShorthand = conversionResult.targetUnit;
            ingredient.measurementUnit = expandOrShortenUnit(ingredient.measurementShorthand, selectedSystem);
            return ingredient;
        });

        try {
            const convertedIngredients = await Promise.all(conversionPromises);
            const recipe = new Recipe({ ...recipeData, ingredients: convertedIngredients });
            recipe.images = req.files.map((f, i) => ({ url: f.path, filename: f.filename, altText: req.body.altText[i] }));
            await recipe.save();
            await req.user.updateOne({ $set: { measurementSystem: selectedSystem } });
            req.flash('success', 'Successfully created a new recipe!');
            res.redirect(`/recipes/${recipe._id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports.showRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes');
    }
    const user = req.user;
    function roundValue(value) {
        let roundedValue = value.toFixed(1);
        return parseFloat(roundedValue);
    };
    const ingredientsArray = recipe.ingredients;
    const convertedIngredients = await Promise.all(ingredientsArray.map(async (ingredient) => {
        const conversionResult = convertToImperial(ingredient.amount, ingredient.measurementShorthand, recipe.measurementSystem);
        return {
            amount: conversionResult.convertedAmount,
            measurementShorthand: conversionResult.targetUnit,
            ingredientName: ingredient.ingredientName,
        };
    }));
    res.render('recipes/show', { recipe, user, convertedIngredients, roundValue });
}

module.exports.renderEditForm = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes');
    }
    const user = req.user;
    const ingredientsArray = recipe.ingredients;
    const convertedIngredients = await Promise.all(ingredientsArray.map(async (ingredient) => {
        const conversionResult = await convertToImperial(ingredient.amount, ingredient.measurementShorthand, recipe.measurementSystem);
        return {
            amount: conversionResult.convertedAmount,
            measurementShorthand: conversionResult.targetUnit,
            ingredientName: ingredient.ingredientName,
        };
    }));
    res.render('recipes/edit', { recipe, user, countryInfoData, metricShorthandData, imperialShorthandData, convertedIngredients })
}

module.exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    const recipeData = req.body.recipe;
    const selectedCountryCode = recipeData.countryCode;
    const countryData = getCountryInfo(selectedCountryCode);
    recipeData.countryFullname = countryData.countryFullname;
    recipeData.countryFlag = countryData.countryFlag;
    const selectedSystem = recipeData.measurementSystem;
    const ingredientsArray = recipeData.ingredients ? recipeData.ingredients : [recipeData.ingredients];

    if (Array.isArray(ingredientsArray)) {
        const convertedIngredients = await Promise.all(ingredientsArray.map(async (ingredient) => {
            const { convertedAmount, targetUnit } = await convertToMetric(ingredient.amount, ingredient.measurementShorthand, selectedSystem);
            return {
                ...ingredient,
                amount: convertedAmount,
                measurementShorthand: targetUnit,
                measurementUnit: expandOrShortenUnit(targetUnit, selectedSystem)
            };
        }));

        const recipe = await Recipe.findByIdAndUpdate(id, { ...recipeData, ingredients: convertedIngredients });

        if (req.body.altText) {
            req.body.altText.forEach((altText, i) => {
                if (altText && recipe.images[i]) {
                    recipe.images[i].altText = altText;
                }
            });
        }

        const newImages = req.files.map((f, i) => ({ url: f.path, filename: f.filename, altText: req.body.newAltText[i] }));
        recipe.images.push(...newImages);

        await recipe.save();
        await req.user.updateOne({ $set: { measurementSystem: selectedSystem } });

        if (req.body.deleteImages) {
            await Promise.all(req.body.deleteImages.map(filename => cloudinary.uploader.destroy(filename)));
            await recipe.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }
    }

    req.flash('success', 'Successfully updated recipe');
    res.redirect(`/recipes/${id}`);
}


module.exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted recipe')
    res.redirect('/recipes');
}