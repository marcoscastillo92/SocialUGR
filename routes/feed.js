const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment.js');
const User = require('../models/user')

const username = "pepita"

const storage = multer.diskStorage({
    destination: './public/imgs',
    filename: function (req, file, cb) {
        var name = "image_" + Date.now() + path.extname(file.originalname);
        cb(null, name)
        const post = new Post({
            username: req.user.username, description: req.body.description,
            date: Date.now(), idPost: req.user.username + Date.now(), likes: [], comments: [], image: "/public/imgs/" + name,
            type: "image"
        });
        post.save();
    }
});

//Init
const upload = multer({
    storage: storage
}).single('post-image');

router.post('/subir-post-multimedia', async (req, res) => {
    // if(req.file.size < 2097152){
    // console.log("Size: -> " + (req.body))
    // console.log("Size: -> " + (req.body.username))

    // console.log("Size: -> " + JSON.parse(req.body))
    upload(req, res, async err => {
        if (err) {
            res.redirect('feed/' + req.user.username, { msg: err });
            console.log("ERRRRRRRO-> " + err)
        } else {
            // const posts = await Post.find({username: req.user.username}).sort({date: "desc"});
            res.redirect('feed/' + req.user.username)
        }
    });
    // }else{
    //     res.render('feed', {msg: "Imagen demasiado grande!"});
    // }
    // console.log("File: " + req.file);
    // console.log("Body: " + req.body);
});

router.post('/subir-post', async (req, res) => {
    const post = new Post({
        username: req.body.username, description: req.body.description,
        date: Date.now(), idPost: req.body.username + Date.now(), likes: [], comments: [], image: "unknown",
        type: "text"
    });
    await post.save();
    res.redirect('feed/' + req.body.username)
});

router.post('/subir-comentario', async (req, res) => {
    console.log(req.body)
    var comm = { username: req.body.username, comment: req.body.comment, date: Date.now(), idPost: req.body.idPost, likes: [], idComment: 'comment_' + Date.now() }
    var comentario = new Comment(comm)
    await comentario.save()

    // var post = await Post.find({idPost: req.body.idPost})
    var comments = await Comment.find({ idPost: req.body.idPost })
    Post.findOne({
        idPost: req.body.idPost
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

router.post('/subir-like', async (req, res) => {
    const like = new Like({ username: req.body.username, date: Date.now(), idPost: req.body.idPost, idLike: "like_" + Date.now() })
    await like.save()

    const likes = await Like.find({ idPost: req.body.idPost }).sort({ date: 'desc' })
    Post.findOne({
        idPost: req.body.idPost
    })
        .then((post) => {
            console.log("likes -> " + likes)
            post.likes = likes;
            post
                .save()
                .then(() => {
                    res.send({ action: "insert" });
                });
        });

});

router.post('/eliminar-like', async (req, res) => {
    await Like.deleteOne({ idPost: req.body.idPost, username: req.body.username })
    const likes = await Like.find({ idPost: req.body.idPost })
    Post.findOne({
        idPost: req.body.idPost
    })
        .then((post) => {
            console.log("likes -> " + likes)
            post.likes = likes;
            post
                .save()
                .then(() => {
                    res.send({ action: "delete", post: req.body });
                });
        });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}


router.get('/feed/:username', isLoggedIn, async function (req, res) {
    const profile = await Profile.findOne({ username: req.user.username })
    var posts = new Array();
    var following = profile.following;
   
    for (fol in following) {
        posts[fol] = (await Post.find({ username: following[fol].username }));
        posts[fol].profileImage = following[fol].image;
        //posts[fol].sort({ date: "desc" });
    }
    
    res.render('feed', { posts: posts, profile: profile });
});

router.get('/profile-add', async function (req, res) {
    const followers = 13;
    const following = 1;
    const perfil = new Profile({ username: 'marcoscastillo', name: 'Marcos', lastName: 'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image: "perfil.jpg", landscape: "paisaje.jpg", followers: followers, following: following });
    perfil.save();
    res.redirect('/profile');
});

module.exports = router;