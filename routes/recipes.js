const express = require('express');
const router = express.Router();
const recipes = require('../controllers/recipes');
const catchAsync = require('../helper/catchAsync');
const { isLoggedIn, validateRecipe, isAuthor } = require('../middleware');

router.get('/', catchAsync(recipes.index));

router.get('/new', isLoggedIn, recipes.renderNewForm)

router.post('/', isLoggedIn, validateRecipe, catchAsync(recipes.createRecipe));

router.get('/:id', catchAsync(recipes.showRecipe));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(recipes.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateRecipe, catchAsync(recipes.updateRecipe))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe));

module.exports = router;