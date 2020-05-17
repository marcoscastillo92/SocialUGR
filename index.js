const express = require('express');
const path = require('path');
//const exphbs = require('express-handlebars');
const session = require('express-session');

//Initializations
const app = express();
const router = express.Router();
require('./database');

//Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


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