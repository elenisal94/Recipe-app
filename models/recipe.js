const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    preparationTime: String,
    serves: Number,
    description: String,
    location: String,
    ingredients: [String],
    method: [String]
});

module.exports = mongoose.model('Recipe', RecipeSchema);