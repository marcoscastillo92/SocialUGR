const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment.js');

const username = "pepita"

const storage = multer.diskStorage({
    destination: './public/imgs',
    filename: function(req, file, cb){
        var name = "image_" + Date.now() + path.extname(file.originalname); 
        cb(null, name)
        const fecha = new Date()
        const post = new Post({username: username, description: req.body.description, 
            date: Date.now(), idPost: username+Date.now(), likes: [], comments: [], image: "/public/imgs/"+name,
            type: "image"
        });
        post.save();
    }
});

//Init
const upload = multer({
    storage: storage
}).single('post-image');

router.post('/subir-post-multimedia', async (req, res) =>{
    // if(req.file.size < 2097152){
        // console.log("Size: -> " + (req.body))
        // console.log("Size: -> " + (req.body.username))

        // console.log("Size: -> " + JSON.parse(req.body))
        upload(req, res, async err =>{
            if(err){
                res.render('feed', {msg: err});
            }else{
                console.log(req.file);
                const posts = await Post.find({username: username}).sort({date: "desc"});
                res.redirect('feed/' + username)
            }
        });
    // }else{
    //     res.render('feed', {msg: "Imagen demasiado grande!"});
    // }
    // console.log("File: " + req.file);
    // console.log("Body: " + req.body);
});

router.post('/subir-post', async (req, res) =>{
    const post = new Post({username: username, description: req.body.description, 
        date: Date.now(), idPost: username+Date.now(), likes: [], comments: [], image: "unknown",
        type: "text"
    });
    await post.save();
    res.redirect('feed/' + username)
});

router.post('/subir-comentario', async(req, res) =>{
    console.log(req.body)
    var comm = {username: username, comment: req.body.comment, date:Date.now(), idPost:req.body.idPost , likes: [], idComment: 'comment_'+Date.now()}
    var comentario = new Comment(comm)
    await comentario.save()

    // var post = await Post.find({idPost: req.body.idPost})
    var comments = await Comment.find({idPost:req.body.idPost})
    Post.findOne({
        idPost : req.body.idPost
      })
      .then((post) => {
        // console.log("POST -> "+post)
        post.comments = comments;
        post
          .save()
          .then(() => {
            res.send(comm)
          });
      });
});

router.post('/subir-like', async(req, res) =>{
    const like = new Like({username: req.body.username, date: Date.now(), idPost: req.body.idPost, idLike: "like_"+Date.now()})
    await like.save()

    const likes = await Like.find({idPost:req.body.idPost}).sort({date: 'desc'})
    Post.findOne({
            idPost : req.body.idPost
          })
          .then((post) => {
            console.log("likes -> "+likes)
            post.likes = likes;
            post
              .save()
              .then(() => {
                res.send({action:"insert"});
              });
          });
    
});

router.post('/eliminar-like', async(req, res) =>{
    await Like.deleteOne({idPost:req.body.idPost, username: req.body.username})
    const likes = await Like.find({idPost:req.body.idPost})
    Post.findOne({
        idPost : req.body.idPost
      })
      .then((post) => {
        console.log("likes -> "+likes)
        post.likes = likes;
        post
          .save()
          .then(() => {
            res.send({action:"delete", post: req.body});
          });
      });
});

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return 'Hace '+Math.round(elapsed/1000) + ' segundos';   
    }

    else if (elapsed < msPerHour) {
         return 'Hace ' + Math.round(elapsed/msPerMinute) + ' minutos';   
    }

    else if (elapsed < msPerDay ) {
         return 'Hace ' + Math.round(elapsed/msPerHour ) + ' Horas';   
    }

    else if (elapsed < msPerMonth) {
        return 'Aproximadamente hace ' + Math.round(elapsed/msPerDay) + ' días';   
    }

    else if (elapsed < msPerYear) {
        return 'Aproximadamente hace ' + Math.round(elapsed/msPerMonth) + ' meses';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}


router.get('/feed/:username', async function(req, res){
    const posts = await Post.find({username: req.params.username}).sort({date: "desc"});
    res.render('feed', {posts:posts, username: req.params.username});
});

router.get('/profile-add', async function(req, res){
    const followers = 13;
    const following = 1;
    const perfil = new Profile({username:'marcoscastillo', name:'Marcos', lastName:'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image:"perfil.jpg", landscape:"paisaje.jpg", followers: followers, following: following});
    perfil.save();
    res.redirect('/profile');
});

module.exports = router;