const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

// Define ingredient schema
const ingredientSchema = Joi.object({
    amount: Joi.number().min(0).allow(null, ''),
    measurementUnit: Joi.string(),
    measurementShorthand: Joi.string(),
    ingredientName: Joi.string().required().escapeHTML(),
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
        title: Joi.string().max(150).required().escapeHTML(),
        description: Joi.string().max(1400).required().escapeHTML(),
        prepHours: Joi.number().min(0).allow(null, ''),
        prepMinutes: Joi.number().min(0).allow(null, ''),
        serves: Joi.number().required().min(1),
        countryCode: Joi.string().required(),
        measurementSystem: Joi.string().required(),
        ingredients: Joi.array().items(ingredientWithAmountSchema).required(),
        method: Joi.array().items(Joi.string().escapeHTML()).required(),
    }).required().custom((value, helpers) => {
        const { prepHours, prepMinutes } = value;
        if (!prepHours && !prepMinutes) {
            return helpers.message('At least one of hours or minutes must be provided.');
        }
        return value;
    }),
    altText: Joi.array().items(Joi.string().max(300).escapeHTML()),
    newAltText: Joi.array().items(Joi.string().max(300).escapeHTML()),
    deleteImages: Joi.array()
});

// Define review schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().max(600).escapeHTML(),
    }).required()
});
