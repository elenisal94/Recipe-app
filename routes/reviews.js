const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../helper/catchAsync');
const ExpressError = require('../helper/ExpressError');
const { reviewSchema } = require('../schemas.js')
const Recipe = require('../models/recipe');
const Review = require('../models/review')

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/recipes/${id}`);
}))

module.exports = router;