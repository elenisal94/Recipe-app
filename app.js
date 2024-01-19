const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Recipe = require('./models/recipe');
const app = express();
const convert = require('convert-units');
const { getCountryInfo, countryInfoData } = require('./utils/countryInfo')
const { expandOrShortenUnit, metricShorthandData, imperialShorthandData } = require('./utils/shorthand')
const { convertToMetric, convertToImperial } = require('./utils/convertUnitAmount');
const recipe = require('./models/recipe');

mongoose.connect('mongodb://localhost:27017/recipe-app');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

            res.redirect(`/recipes/${recipe._id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
});


app.get('/recipes/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
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
});

app.get('/recipes/:id/edit', async (req, res) => {
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
})

app.put('/recipes/:id', async (req, res) => {
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
});


app.listen(3000, () => {
    console.log('Serving on port 3000')
})