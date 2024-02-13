const express = require('express');
const router = express.Router();
const recipes = require('../controllers/recipes');
const catchAsync = require('../helper/catchAsync');
const { isLoggedIn, validateRecipe, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(recipes.index))
    .post(isLoggedIn, upload.array('image'), validateRecipe, catchAsync(recipes.createRecipe));

router.get('/new', isLoggedIn, recipes.renderNewForm);

router.route('/:id')
    .get(catchAsync(recipes.showRecipe))
    .put(isLoggedIn, isAuthor, validateRecipe, catchAsync(recipes.updateRecipe))
    .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(recipes.renderEditForm));

module.exports = router;