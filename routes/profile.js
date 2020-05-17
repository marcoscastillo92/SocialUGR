const router = require('express').Router();

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment.js');

//new Profile({})

router.get('/profile/:username', async function(req, res){
    const perfil = await Profile.find({username: req.params.username});
    const posts = await Post.find({username: req.params.username});
    const comentarios = [];
    for (post in posts){
        post.push(Comment.find({idPost: post.idPost}))
    }
    console.log(perfil);
    console.log(perfil[0].name);
    res.render('profile', {perfil:perfil[0], posts:posts});
});

router.get('/profile-add', async function(req, res){
    const followers = 13;
    const following = 1;
    const perfil = new Profile({username:'marcoscastillo', name:'Marcos', lastName:'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image:"perfil.jpg", landscape:"paisaje.jpg", followers: followers, following: following});
    perfil.save();
    res.redirect('/profile');
});

module.exports = router;