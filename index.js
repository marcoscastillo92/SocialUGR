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
// app.engine('.hbs', exphbs({
//     defaultLayout: 'main',
//     layoutsDir: path.join(app.get('views'), 'layouts'),
//     partialsDir: path.join(app.get('views'), 'partials'),
//     extname: '.hbs'
// }));
//app.set('view engine', '.hbs');
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
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/feed', (req, res) => {
    res.render('feed');
    //res.sendFile(__dirname + '/public/html/feed.html');
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/perfil', function(req, res){
    res.render('profile');
    //res.sendFile(__dirname + '/public/html/perfil.html');
});

app.get('/imgs/:imagen', function(req, res){
    res.sendFile(__dirname + '/imgs/'+req.params.imagen);
});

app.get('/css/:css', function(req, res){
    res.sendFile(__dirname + '/public/css/'+req.params.css);
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server init
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'));
})