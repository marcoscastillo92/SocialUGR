const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    console.log(req.body);
    res.render('index');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/feed',
    failureRedirect: '/',
    passReqToCallback: true
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/feed',
    failureRedirect: '/',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

router.get('/feed', isLoggedIn, (req, res, next) => {
    res.render('feed', {
        user: req.user
    });
});

router.get('/perfil', isLoggedIn, (req, res, next) => {
    res.render('perfil', {
        user: req.user
    });
});

module.exports = router;