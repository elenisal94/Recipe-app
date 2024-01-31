const express = require('express');
const router = express.Router();
const catchAsync = require('../helper/catchAsync');
const ExpressError = require('../helper/ExpressError');
const Recipe = require('../models/recipe');
const convert = require('convert-units');
const { getCountryInfo, countryInfoData } = require('../utils/countryInfo')
const { expandOrShortenUnit, metricShorthandData, imperialShorthandData } = require('../utils/shorthand')
const { convertToMetric, convertToImperial } = require('../utils/convertUnitAmount');
const { recipeSchema } = require('../schemas.js')


const validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});

router.get('/new', (req, res) => {
    res.render('recipes/new', { countryInfoData, metricShorthandData, imperialShorthandData });
})

router.post('/', validateRecipe, catchAsync(async (req, res, next) => {
    const recipeData = req.body.recipe;
    const selectedCountryCode = recipeData.countryCode;
    const countryData = getCountryInfo(selectedCountryCode);
    recipeData.countryFullname = countryData.countryFullname;
    recipeData.countryFlag = countryData.countryFlag;

    const selectedSystem = recipeData.measurementSystem;
    const ingredientsArray = recipeData.ingredients;

    if (Array.isArray(ingredientsArray)) {
        const conversionPromises = ingredientsArray.map(async (ingredient) => {
            console.log('Before conversion:', ingredient.measurementShorthand, typeof ingredient.measurementShorthand);
            const conversionResult = await convertToMetric(ingredient.amount, ingredient.measurementShorthand, selectedSystem);
            console.log('After conversion:', conversionResult.targetUnit, typeof conversionResult.targetUnit);
            ingredient.amount = conversionResult.convertedAmount;
            ingredient.measurementShorthand = conversionResult.targetUnit;
            console.log('Final value:', ingredient.measurementShorthand, typeof ingredient.measurementShorthand);
            ingredient.measurementUnit = expandOrShortenUnit(ingredient.measurementShorthand, selectedSystem);
            return ingredient;
        });

        try {
            const convertedIngredients = await Promise.all(conversionPromises);
            const recipe = new Recipe({ ...recipeData, ingredients: convertedIngredients });
            await recipe.save();
            req.flash('success', 'Successfully created a new recipe!');
            res.redirect(`/recipes/${recipe._id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}));


router.get('/:id', catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('reviews');
    function roundValue(value) {
        let roundedValue = value.toFixed(1);
        return parseFloat(roundedValue);
    };
    const ingredientsArray = recipe.ingredients;
    const convertedIngredients = await Promise.all(ingredientsArray.map(async (ingredient) => {
        const conversionResult = await convertToImperial(ingredient.amount, ingredient.measurementShorthand, recipe.measurementSystem);
        return {
            amount: conversionResult.convertedAmount,
            measurementShorthand: conversionResult.targetUnit,
            ingredientName: ingredient.ingredientName,
        };
    }));
    res.render('recipes/show', { recipe, convertedIngredients, roundValue });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const ingredientsArray = recipe.ingredients;
    const convertedIngredients = await Promise.all(ingredientsArray.map(async (ingredient) => {
        const conversionResult = await convertToImperial(ingredient.amount, ingredient.measurementShorthand, recipe.measurementSystem);
        return {
            amount: conversionResult.convertedAmount,
            measurementShorthand: conversionResult.targetUnit,
            ingredientName: ingredient.ingredientName,
        };
    }));
    res.render('recipes/edit', { recipe, countryInfoData, metricShorthandData, imperialShorthandData, convertedIngredients })
}))

router.put('/:id', validateRecipe, catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const recipeData = req.body.recipe;
        const selectedCountryCode = recipeData.countryCode;
        const countryData = getCountryInfo(selectedCountryCode);
        recipeData.countryFullname = countryData.countryFullname;
        recipeData.countryFlag = countryData.countryFlag;
        const selectedSystem = recipeData.measurementSystem;
        const ingredientsArray = recipeData.ingredients;
        console.log('ingredients array received:', ingredientsArray);
        if (Array.isArray(ingredientsArray)) {
            const conversionPromises = ingredientsArray.map(async (ingredient) => {
                const conversionResult = await convertToMetric(ingredient.amount, ingredient.measurementShorthand, selectedSystem);
                ingredient.amount = conversionResult.convertedAmount;
                ingredient.measurementShorthand = conversionResult.targetUnit;
                ingredient.measurementUnit = expandOrShortenUnit(ingredient.measurementShorthand, selectedSystem);
                return ingredient;
            });
            const convertedIngredients = await Promise.all(conversionPromises);
            await Recipe.findByIdAndUpdate(id, { ...recipeData, ingredients: convertedIngredients });
            res.redirect(`/recipes/${id}`);
        } else {
            res.status(400).send('Invalid request format');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}))

module.exports = router;