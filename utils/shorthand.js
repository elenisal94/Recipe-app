const convert = require('convert-units');

const metricShorthandData = {
    null: { measurementShorthand: null },
    "liters": { measurementShorthand: "l" },
    "grams": { measurementShorthand: "g" },
    "milliliters": { measurementShorthand: "ml" },
    "kilograms": { measurementShorthand: "kg" },
    "teaspoons": { measurementShorthand: "tsp" },
    "tablespoons": { measurementShorthand: "Tbs" },
    "cups": { measurementShorthand: "cup" },
    "milligrams": { measurementShorthand: "mg" },
};
const imperialShorthandData = {
    null: { measurementShorthand: null },
    "gallons": { measurementShorthand: "gal" },
    "ounces": { measurementShorthand: "oz" },
    "teaspoons": { measurementShorthand: "tsp" },
    "tablespoons": { measurementShorthand: "Tbs" },
    "cups": { measurementShorthand: "cup" },
    "quarts": { measurementShorthand: "qt" },
    "fluid ounces": { measurementShorthand: "fl-oz" },
    "pounds": { measurementShorthand: "lb" },
};

function expandOrShortenUnit(unit, system) {
    const units = system === 'metric' ? metricShorthandData : imperialShorthandData;
    if (units.hasOwnProperty(unit)) {
        return units[unit].measurementShorthand || null;
    } else {
        const unitDetails = convert().describe(unit);
        if (unitDetails) {
            return unitDetails.plural || null;
        } else {
            console.error(`Error: Unit "${unit}" not found in ${system} units`);
            return null;
        }
    }
}

module.exports = { expandOrShortenUnit, metricShorthandData, imperialShorthandData };