const mongoose = require('mongoose');
const { foodNames, descriptors } = require('./seedHelpers');
const Recipe = require('../models/recipe');
const { countryInfoData } = require('../utils/countryInfo')
const { metricShorthandData } = require('../utils/shorthand')

mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const getRandomCountry = () => {
    const countryCodes = Object.keys(countryInfoData);
    const randomCountryCode = sample(countryCodes);
    return { randomCountryCode, ...countryInfoData[randomCountryCode] };
};

const seedDB = async () => {
    await Recipe.deleteMany({});
    for (let i = 0; i < 30; i++) {
        const randomHour = Math.floor(Math.random() * 4);
        const randomMin = Math.floor(Math.random() * 11) * 5;
        const prepHours = randomHour;
        const prepMinutes = randomMin;
        const { randomCountryCode, ...countryInfo } = getRandomCountry();

        const ingredients = Array.from({ length: 8 }, () => {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            const unitKeys = Object.keys(metricShorthandData);
            const randomUnitKey = sample(unitKeys);
            const randomUnitInfo = metricShorthandData[randomUnitKey];
            return {
                amount: randomNumber,
                measurementUnit: randomUnitKey,
                measurementShorthand: randomUnitInfo.measurementShorthand,
                ingredientName: sample(['Fluffberrium', 'Sizzlelume', 'Zestivara', 'Crunchellia', 'Velvetiza', 'Herbblitzium', 'Citrofusionite', 'Umamixerite'])
            };
        });

        const loremIpsumVariations = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Suspendisse potenti nullam ac tortor vitae purus faucibus.',
            'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            'Vestibulum fringilla tortor id elit laoreet ultricies.',
            'Quisque nec leo eu justo dignissim ullamcorper.',
            'Curabitur et turpis at ligula ullamcorper laoreet nec nec odio.',
            'Fusce eu dui eget orci commodo feugiat in id odio.',
            'Nullam tincidunt libero eu risus congue, ac auctor felis pharetra.',

        ];

        const method = Array.from({ length: 8 }, (_, index) => {
            const randomLoremIpsum = sample(loremIpsumVariations);
            return `${randomLoremIpsum}`;
        });
        const recipe = new Recipe({
            title: `${sample(descriptors)} ${sample(foodNames)}`,
            prepHours,
            prepMinutes,
            serves: `${Math.floor(Math.random() * 6) + 1}`,
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet dictum sit amet justo donec. Amet nisl suscipit adipiscing bibendum est.`,
            countryCode: randomCountryCode,
            countryFullname: countryInfo.countryFullname,
            countryFlag: countryInfo.countryFlag,
            measurementSystem: 'metric',
            ingredients,
            method
        });

        await recipe.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
