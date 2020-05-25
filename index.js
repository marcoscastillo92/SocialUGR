const express = require('express');
const path = require('path');
//const exphbs = require('express-handlebars');
// const session = require('express-session');
/**AA */
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const engine = require('ejs-mate');
/** */

//Initializations
const app = express();
const router = express.Router();
require('./database');
require('./passport');

//Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
app.use(express.json());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    next();
});

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/profile'));
app.use(require('./routes/feed'));

//Static Files
app.use("/public",express.static(__dirname + "/public"));
app.use("/imgs",express.static(__dirname + "/imgs"));

//Server init
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'));
})