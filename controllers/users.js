const User = require('../models/user');

module.exports.renderSignup = (req, res) => {
    res.render('users/signup')
};

module.exports.signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', "Welcome to Eleni's recipe parapdise!")
            res.redirect('/recipes');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/recipes';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/recipes');
    });
}

module.exports.renderSettings = (req, res) => {
    const user = req.user;
    res.render('users/settings', { user });
}

module.exports.updateSettings = async (req, res) => {
    const userId = req.user._id;
    console.log('user id', userId)
    const { measurementSystem } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { measurementSystem }, { new: true });
        req.flash('success', 'Settings updated successfully!');
        res.redirect(`/settings/${userId}`);
    } catch (error) {
        req.flash('error', 'An error occurred while updating settings.');
        res.redirect(`/settings/${userId}`);
    }
};