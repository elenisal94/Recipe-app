const convert = require('convert-units');

const imperialToMetricConversion = {
    gal: { target: 'l' },
    oz: { target: 'g' },
    tsp: { target: 'tsp' },
    Tbs: { target: 'Tbs' },
    cup: { target: 'cup' },
    qt: { target: 'l' },
    'fl-oz': { target: 'ml' },
    lb: { target: 'kg' },
};


const metricToImperialConversion = {
    l: { target: 'gal' },
    g: { target: 'oz' },
    tsp: { target: 'tsp' },
    Tbs: { target: 'Tbs' },
    cup: { target: 'cup' },
    ml: { target: 'fl-oz' },
    kg: { target: 'lb' },
};


function convertToMetric(unitAmount, unitSelect, measurementSystem) {
    if (measurementSystem !== 'imperial' || unitSelect === null) {
        return { convertedAmount: unitAmount, targetUnit: unitSelect };
    }
    console.log(unitAmount, unitSelect);
    if (imperialToMetricConversion.hasOwnProperty(unitSelect)) {
        const targetUnit = imperialToMetricConversion[unitSelect].target;
        const convertedAmount = convert(unitAmount).from(unitSelect).to(targetUnit);
        return { convertedAmount, targetUnit };
    } else {
        console.warn(`Conversion not available for ${unitSelect}`);
        return { convertedAmount: unitAmount, targetUnit: unitSelect };
    }
}


function convertToImperial(unitAmount, unitSelect, measurementSystem) {
    if (unitSelect === 'l') {
        const gallons = convert(unitAmount).from(unitSelect).to('gal');
        const quarts = convert(unitAmount).from(unitSelect).to('qt');
        const targetUnit = gallons >= 1 ? 'gal' : 'qt';
        const convertedAmount = convert(unitAmount).from(unitSelect).to(targetUnit);
        return { convertedAmount, targetUnit };
    }
    if (metricToImperialConversion.hasOwnProperty(unitSelect)) {
        const targetUnit = metricToImperialConversion[unitSelect].target;
        const convertedAmount = convert(unitAmount).from(unitSelect).to(targetUnit);
        return { convertedAmount, targetUnit };
    } else {
        console.warn(`Conversion not available for ${unitSelect}`);
        return { convertedAmount: unitAmount, targetUnit: unitSelect };
    }
};


module.exports = { convertToMetric, convertToImperial };