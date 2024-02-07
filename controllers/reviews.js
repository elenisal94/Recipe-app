const Recipe = require('../models/recipe');
const Review = require('../models/review');
const catchAsync = require('../helper/catchAsync');

module.exports.createReview = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    console.log('Review before saving:', review.author.username);
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    req.flash('success', 'Rating submitted!')
    res.redirect(`/recipes/${recipe._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted rating and review')
    res.redirect(`/recipes/${id}`);
}
