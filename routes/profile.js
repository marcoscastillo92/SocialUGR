const router = require('express').Router();

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment.js');


router.get('/profile/:username', async function(req, res){
    const perfil = await Profile.find({username: req.params.username});
    var posts = await Post.find({username: req.params.username});
    console.log(posts);
    for (post in posts){
        post.comentarios = Comment.find({idPost: post.idPost});
    }
    res.render('profile', {perfil:perfil[0], posts:posts});
});

router.get('/profile-add', async function(req, res){
    const followers = 13;
    const following = 1;
    const perfil = new Profile({username:'marcoscastillo', name:'Marcos', lastName:'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image:"perfil.jpg", landscape:"paisaje.jpg", followers: followers, following: following});
    //perfil.save();
    const post = new Post({username:"marcoscastillo", description:"Esto es un post de prueba", image:"paisaje.jpg"});
    post.save();
    res.redirect('/profile/'+perfil.username);
});

module.exports = router;