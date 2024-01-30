const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: { type: String, required: true, maxlength: 150 },
    image: { type: String, required: true },
    description: { type: String, required: true, maxlength: 600 },
    prepHours: {
        type: Number, min: 0, validate: {
            validator: function () {
                return this.prepHours !== undefined || this.prepMinutes !== undefined;
            },
            message: 'At least one of hours or minutes must be provided.'
        }
    },
    prepMinutes: {
        type: Number, min: 0, validate: {
            validator: function () {
                return this.prepHours !== undefined || this.prepMinutes !== undefined;
            },
            message: 'At least one of hours or minutes must be provided.'
        }
    },
    serves: { type: Number, required: true, min: 1 },
    countryCode: { type: String, required: true },
    countryFullname: { type: String, required: true },
    countryFlag: { type: String, required: true },
    measurementSystem: { type: String, required: true },
    ingredients: {
        type: [
            {
                amount: {
                    type: Number,
                    min: 1,
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
                ingredientName: { type: String, required: true }
            }
        ],
        required: true
    },
    method: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);