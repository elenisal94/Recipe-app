const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    prepHours: Number,
    prepMinutes: Number,
    serves: Number,
    description: String,
    country: String,
    countryFullname: String,
    countryFlag: String,
    measurementSystem: String,
    ingredients: [
        {
            amount: Number,
            measurementUnit: String,
            measurementShorthand: String,
            ingredientName: String,
        }
    ],
    method: [String]
});

module.exports = mongoose.model('Recipe', RecipeSchema);