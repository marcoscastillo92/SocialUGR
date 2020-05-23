const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
const app = express();

const uri = "mongodb+srv://root:root@socialugr-ldctc.gcp.mongodb.net/socialugr?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(session({secret: 'weg312tGwg4G', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/templates'));

app.set('view engine','ejs');

var sesion;

var serviceURL = "http";
var socket = io.connect(serviceURL);

socket.on('evento', function(data){
    window.alert("LLEGA MENSAJE");
})

router.get('/perfil',(req,res) => {
    sesion = req.session;
    if(sesion.username){
        const document;
        const ownedPosts;
        client.connect(err => {
            const profileCollection = client.db("socialugr").collection("profile");
            // perform actions on the collection object
            document = profileCollection.find({"user": name}); //name, lastName, birthDate, gender, username, bios, following, followers, image
            const postCollection = client.db("socialugr").collection("post");
            ownedPosts = postCollection.find({"username" : document.username}); //date, username, description, image, type, idPost, likes 
            foreach (singlePost in ownedPosts){
                singlePost['username'] 
            }
            client.close();
        });
        return res.render('perfil', {perfil : document, posts : ownedPosts})
    }
});

