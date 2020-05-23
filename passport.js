const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({username: username});

    if (user) {
        return done(null, false, req.flash('signupMessage', 'El usuario ya esta en uso'));
    }
    else{
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encriptaHash(password);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username: username });
    
    if (!user) {
        return done(null, false, req.flash('loginMessage', 'El usuario no existe'));
    }
    if (!user.validaPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'La contraseña es incorrecta'));
    }
    done(null, user);
}));