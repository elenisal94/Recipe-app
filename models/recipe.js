const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    image: String,
    description: String,
    prepHours: Number,
    prepMinutes: Number,
    serves: Number,
    countryCode: String,
    countryFullname: String,
    countryFlag: String,
    measurementSystem: String,
    ingredients: [
        {
            amount: {
                type: Number,
                // default: null,
                set: function (value) {
                    return value === 'null' || value === undefined ? null : value;
                }
            },
            measurementUnit: {
                type: String,
                set: function (value) {
                    return value === 'null' ? null : value;
                }
            },
            measurementShorthand: {
                type: String,
                set: function (value) {
                    return value === 'null' ? null : value;
                }
            },
            ingredientName: String,
        }
    ],
    method: [String]
});

module.exports = mongoose.model('Recipe', RecipeSchema);