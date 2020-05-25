const express = require('express');
const router = express.Router();
const passport = require('passport');

const Perfil = require('../models/Profile');
const User = require('../models/user');

router.get('/', isSesionActive, (req, res, next) => {
    const nameMessage = req.flash('nameError')[0];
    const lastNameMessage = req.flash('lastNameError')[0];
    const usernameMessage = req.flash('usernameError')[0];
    const birthDateMessage = req.flash('birthDateError')[0];
    const genderMessage = req.flash('genderError')[0];
    const emailMessage = req.flash('emailError')[0];

    res.render('index', {
        nameMessage,
        lastNameMessage,
        usernameMessage,
        birthDateMessage,
        genderMessage,
        emailMessage
    });
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

router.post('/perfilNuevo', async (req, res) => {
    const { name, lastName, username, birthDate, gender, email }= req.body;
    var error = false;

    if (!username) {
        error = true;
        req.flash('usernameError', 'Introduce un usuario');
    }
    else {
        const found = await User.findOne({ username: username });
        if(found){
            error = true;
            req.flash('usernameError', 'El usuario ya esta en uso');
        }
    }
    if(!name) {
        error = true;
        req.flash('nameError', 'Introduce un nombre');
    }
    if (!lastName) {
        error = true;
        req.flash('lastNameError', 'Introduce un apellido');
    }
    if (!birthDate) {
        error = true;
        req.flash('birthDateError', 'Introduce la fecha de nacimiento');
    }
    if (!gender) {
        error = true;
        req.flash('genderError', 'Introduce tu genero');
    }
    if (!email) {
        error = true;
        req.flash('emailError', 'Introduce tu correo');
    }
    if (error) {
        res.redirect('/');
    }
    else{
        const newProfile = new Perfil({ name, lastName, birthDate, gender, username, email });
        await newProfile.save();
        res.redirect(307, '/signup');
    }
});

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

function isSesionActive(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/feed');
    }
    return next();
}

router.get('/feed', isLoggedIn, (req, res, next) => {
    res.redirect('/feed/' + req.user.username);
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.redirect('/profile/' + req.user.username);
});

module.exports = router;