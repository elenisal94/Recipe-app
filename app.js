const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { recipeSchema, reviewSchema } = require('./schemas.js')
const catchAsync = require('./helper/catchAsync')
const ExpressError = require('./helper/ExpressError')
const methodOverride = require('method-override');
const Recipe = require('./models/recipe');
const Review = require('./models/review')
const app = express();

const recipes = require('./routes/recipes');

mongoose.connect('mongodb://localhost:27017/recipe-app');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// app.use((req, res, next) => {
//     res.locals.convert = convert;
//     next();
// });


app.use('/recipes', recipes)

app.get('/', (req, res) => {
    res.render('home')
});



app.post('/recipes/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
}))

app.delete('/recipes/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/recipes/${id}`);
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { message = 'something went wrong', statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})