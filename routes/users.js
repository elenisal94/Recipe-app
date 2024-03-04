const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../helper/catchAsync');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');
const { isLoggedIn, isAuthorised } = require('../middleware');


router.get('/signup', users.renderSignup)
    .post('/signup', catchAsync(users.signup));

router.get('/login', users.renderLogin)
    .post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.get('/settings/:id', isLoggedIn, isAuthorised, users.renderSettings)
    .post('/settings/:id', isLoggedIn, isAuthorised, catchAsync(users.updateSettings));

module.exports = router;