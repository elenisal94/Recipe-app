const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const app = express();
const convert = require('convert-units');
const { getCountryInfo, countryInfoData } = require('./utils/countryInfo')
const { expandOrShortenUnit, metricShorthandData, imperialShorthandData } = require('./utils/shorthand')
const { convertToMetric, convertToImperial } = require('./utils/convertUnitAmount')

mongoose.connect('mongodb://localhost:27017/recipe-app');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.convert = convert;
    next();
});

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});

app.get('/recipes/new', (req, res) => {
    res.render('recipes/new', { countryInfoData, metricShorthandData, imperialShorthandData });
})

app.post('/recipes', async (req, res) => {
    const recipeData = req.body.recipe;
    const selectedCountryCode = recipeData.country;
    const countryData = getCountryInfo(selectedCountryCode);
    recipeData.countryFullname = countryData.countryFullname;
    recipeData.countryFlag = countryData.countryFlag;

    const selectedSystem = recipeData.measurementSystem;
    const ingredientsArray = recipeData.ingredients;

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

        res.redirect(`/recipes/${recipe._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const selectedSystem = recipe.measurementSystem;
    const ingredientsArray = recipe.ingredients;
    const convertedIngredients = await Promise.all(ingredientsArray.map(async (ingredient) => {
        const conversionResult = await convertToImperial(ingredient.amount, ingredient.measurementShorthand, recipe.measurementSystem);
        console.log('conversionResult', conversionResult);
        return {
            amount: conversionResult.convertedAmount,
            measurementShorthand: conversionResult.targetUnit,
            ingredientName: ingredient.ingredientName,
        };
    }));
    console.log('converted ingredients', convertedIngredients)
    res.render('recipes/show', { recipe, convertedIngredients });
});



app.listen(3000, () => {
    console.log('Serving on port 3000')
})