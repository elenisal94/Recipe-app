const mongoose = require('mongoose');
const cities = require('./cities');
const { foodNames, descriptors } = require('./seedHelpers');
const Recipe = require('../models/recipe');

mongoose.connect('mongodb://localhost:27017/recipe-app');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Recipe.deleteMany({});
    for (let i = 0; i < 30; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const random8 = Math.floor(Math.random() * 8)+ 1;
        const randomHour = Math.floor(Math.random() * 4);
        const randomMin =  Math.floor(Math.random() * 11) * 5;
        const preparationTime = `${randomHour > 0 ? `${randomHour}h` : ''}${randomMin > 0 ? ` ${randomMin}m` : ''}`;
        const ingredients = Array.from({ length: random8 }, () => {
            const randomIngredientNumber = Math.floor(Math.random() * 6) + 1;
            return `${randomIngredientNumber} ${sample(['Fluffberrium', 'Sizzlelume', 'Zestivara', 'Crunchellia', 'Velvetiza', 'Herbblitzium', 'Citrofusionite', 'Umamixerite'])}`;
        });
        const method = Array.from({ length: random8 }, (_, index) => {
            return `Step ${index + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
        });

        const recipe = new Recipe({
            title: `${sample(descriptors)} ${sample(foodNames)}`,
            preparationTime,
            serves: random8,
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet dictum sit amet justo donec. Amet nisl suscipit adipiscing bibendum est.`,
            location: `${cities[random1000].city}, ${cities[random1000].state}, USA`,
            ingredients,
            method 
        })
        await recipe.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close();
});