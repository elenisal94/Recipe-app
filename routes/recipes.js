const express = require('express');
const router = express.Router();
const catchAsync = require('../helper/catchAsync');
const ExpressError = require('../helper/ExpressError');
const Recipe = require('../models/recipe');
const convert = require('convert-units');
const { getCountryInfo, countryInfoData } = require('../utils/countryInfo')
const { expandOrShortenUnit, metricShorthandData, imperialShorthandData } = require('../utils/shorthand')
const { convertToMetric, convertToImperial } = require('../utils/convertUnitAmount');
const { isLoggedIn, validateRecipe, isAuthor } = require('../middleware');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('recipes/new', { countryInfoData, metricShorthandData, imperialShorthandData });
})

router.post('/', isLoggedIn, validateRecipe, catchAsync(async (req, res, next) => {
    const recipeData = req.body.recipe;
    recipeData.author = req.user._id;
    const selectedCountryCode = recipeData.countryCode;
    const countryData = getCountryInfo(selectedCountryCode);
    recipeData.countryFullname = countryData.countryFullname;
    recipeData.countryFlag = countryData.countryFlag;

    const selectedSystem = recipeData.measurementSystem;
    const ingredientsArray = recipeData.ingredients;

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
    const recipe = await Recipe.findById(req.params.id).populate('reviews').populate('author');
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes');
    }
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

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes');
    }
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

router.put('/:id', isLoggedIn, isAuthor, validateRecipe, catchAsync(async (req, res) => {
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
            req.flash('success', 'Successfully updated recipe')
            res.redirect(`/recipes/${id}`);
        } else {
            res.status(400).send('Invalid request format');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted recipe')
    res.redirect('/recipes');
}))

module.exports = router;