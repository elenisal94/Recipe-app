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

app.get('/makerecipe', async (req,res) => {
    const recipe = new Recipe({title: "Apple pie", description: "lorem  ipsum"});
    await recipe.save();
    res.send(recipe)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})