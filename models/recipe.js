const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    url: String,
    filename: String,
    altText: { type: String, maxlength: 300 }
});

const RecipeSchema = new Schema({
    title: { type: String, required: true, maxlength: 150 },
    images: {
        type: [imageSchema],
        validate:
        {
            validator: function (images) {
                return images.length <= 20;
            },
            message: 'You can upload a maximum of 20 images.'
        }
    },
    description: { type: String, required: true, maxlength: 1400 },
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
                    min: 0,
                    set: function (value) {
                        return value === null || value === undefined || value === 0 || value === '' ? null : value;
                    },
                    default: null
                },
                measurementUnit: {
                    type: String,
                    set: function (value) {
                        return value === 'null' ? null : value;
                    },
                    default: null
                },
                measurementShorthand: {
                    type: String,
                    set: function (value) {
                        return value === 'null' ? null : value;
                    },
                    default: null
                },
                ingredientName: { type: String, required: true }
            }
        ],
        required: true
    },
    method: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

RecipeSchema.pre('save', function (next) {
    if (this.prepHours === '' || this.prepHours === 0) {
        this.prepHours = null;
    }
    if (this.prepMinutes === '' || this.prepMinutes === 0) {
        this.prepMinutes = null;
    }
    next();
});


RecipeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema);