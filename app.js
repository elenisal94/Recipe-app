const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const app  = express();


mongoose.connect('mongodb://localhost:27017/recipe-app');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})