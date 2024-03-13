const Joi = require('joi');

// Define ingredient schema
const ingredientSchema = Joi.object({
    amount: Joi.number().min(0).allow(null, ''),
    measurementUnit: Joi.string(),
    measurementShorthand: Joi.string(),
    ingredientName: Joi.string().required(),
});

// Extend ingredient schema to enforce amount requirement based on measurementUnit
const ingredientWithAmountSchema = ingredientSchema.keys({
    amount: Joi.number().min(0).allow(null, '').when('measurementUnit', {
        is: Joi.exist(),
        then: Joi.number().required(),
        otherwise: Joi.optional(),
    }),
});

// Define recipe schema
module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().max(150).required(),
        description: Joi.string().max(1400).required(),
        prepHours: Joi.number().min(0).allow(null, ''),
        prepMinutes: Joi.number().min(0).allow(null, ''),
        serves: Joi.number().required().min(1),
        countryCode: Joi.string().required(),
        measurementSystem: Joi.string().required(),
        ingredients: Joi.array().items(ingredientWithAmountSchema).required(),
        method: Joi.array().items(Joi.string()).required(),
    }).required().custom((value, helpers) => {
        const { prepHours, prepMinutes } = value;
        if (!prepHours && !prepMinutes) {
            return helpers.message('At least one of hours or minutes must be provided.');
        }
        return value;
    }),
    altText: Joi.array().items(Joi.string().max(300)),
    newAltText: Joi.array().items(Joi.string().max(300)),
    deleteImages: Joi.array()
});

// Define review schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().max(600)
    }).required()
});
