const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../helper/catchAsync');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.get('/signup', users.renderSignup);

router.post('/signup', catchAsync(users.signup))

router.get('/login', users.renderLogin)

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout);

module.exports = router;