const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview } = require('../middleware')
const catchAsync = require('../helper/catchAsync');
const Recipe = require('../models/recipe');
const Review = require('../models/review')

router.post('/', validateReview, catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    req.flash('success', 'Rating submitted!')
    res.redirect(`/recipes/${recipe._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted rating and review')
    res.redirect(`/recipes/${id}`);
}))

module.exports = router;