const router = require('express').Router();

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment.js');


router.get('/profile/:username', async function(req, res){
    const perfil = await Profile.find({username: req.params.username});
    var posts = await Post.find({username: req.params.username});
    for (var i=0; i < posts.length; i++){
        posts[i].likes = [];
        posts[i].fecha = posts[i].date.toString().slice(4,24);
        console.log(posts[i].fecha);
        posts[i].comentarios = await Comment.find({idPost: posts[i]._id});
        if(!posts[i].comentarios){
            posts[i].comentLong = 0;
        }else{
            posts[i].comentLong = posts[i].comentarios.length;
        }
        if(!posts[i].likes){
            posts[i].likesLong = 0;
        }else{
            posts[i].likesLong = posts[i].likes.length;
        }
        console.log(posts[i]);
    }
    res.render('profile', {perfil:perfil[0], posts:posts});
});

router.get('/profile-add', async function(req, res){
    const followers = 13;
    const following = 1;
    //const perfil = new Profile({username:'marcoscastillo', name:'Marcos', lastName:'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image:"perfil.jpg", landscape:"paisaje.jpg", followers: followers, following: following});
    //perfil.save();
    //const post = new Post({username:"marcoscastillo", description:"Esto es un post de prueba", image:"paisaje.jpg"});
    //post.save();
    var {_id} = await Post.findOne({username: "marcoscastillo"});
    const comment = new Comment({username:"marcoscastillo", comment:"Esto es OTRO comentario de prueba", idPost:_id});
    comment.save();
    res.redirect('/profile/marcoscastillo');
});

module.exports = router;