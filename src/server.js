const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const engine = require('ejs-mate');

// Inicializaciones
const app = express();
require('./config/database');
require('./config/passport');

// Configuraciones
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'practicasDS',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    next();
});

// Rutas
app.use('/', require('./app/routes'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Lanzar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ', app.get('port'));
});