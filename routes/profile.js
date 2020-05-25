const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment.js');
const User = require('../models/user.js');
const Like = require('../models/Like.js');
const Authentication = require('../models/Authentication');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

router.get('/profile/:username', isLoggedIn, async function (req, res) {
    //console.log("EN RENDERIZAR PERFIL" + JSON.stringify(req.params.username));
    const perfil = await Profile.findOne({ username: req.params.username });
    const user = await User.findOne({ username: req.user.username });
    if (perfil) {
        for (pos in perfil.following) {
            perfil.following[pos] = (await Profile.findOne({ username: perfil.following[pos].username }));
        }

        for (pos in perfil.followers) {
            perfil.followers[pos] = (await Profile.findOne({ username: perfil.followers[pos].username }));
        }
        await perfil.save();

        var posts = new Array();
        var postsFromProfile = (await Post.find({ username: req.params.username }));
        for (pos in postsFromProfile) {
            const user = await Profile.findOne({ username: postsFromProfile[pos].username })
            postsFromProfile[pos].profileImage = user.image
            posts.push(postsFromProfile[pos])
        }

        posts.sort((a, b) => {
            if (a.date > b.date)
                return -1;
            else
                return 1;
        })
        res.render('profile', { perfil: perfil, posts: posts, user: user });
    } else {
        res.render('notfound', { user: user });
    }
});

router.get('/profile-add', async function (req, res) {
    const followers = 0;
    const following = 0;
    //const perfil = new Profile({username:'pepe', name:'PEPE', lastName:'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image:"perfil.jpg", landscape:"paisaje.jpg", followers: followers, following: following});
    //perfil.save();
    //const post = new Post({username:"pepe", description:"Esto es un post de prueba", image:"paisaje.jpg"});
    //post.save();
    //var {_id} = await Post.findOne({username: "marcoscastillo"});
    //const comment = new Comment({username:"marcoscastillo", comment:"Esto es OTRO comentario de prueba", idPost:_id});
    //comment.save();
    res.redirect('/profile/pepe');
});

router.get('/follow/:username/:toUsername', async function (req, res) {
    var to = req.params.toUsername;
    var from = req.params.username;
    var inArray1 = false;
    if (to != from) {
        const perfilPropio = await Profile.findOne({ username: req.params.username });
        for (following in perfilPropio.following) {
            if (perfilPropio.following[following].username == to) {
                inArray1 = true;
                break;
            }
        }
        if (!inArray1) {
            perfilPropio.following.push(await Profile.findOne({ username: to }));
            await perfilPropio.save();
            const perfilToFollow = await Profile.findOne({ username: req.params.toUsername });
            perfilToFollow.followers.push(await Profile.findOne({ username: from }));
            await perfilToFollow.save();
        }
    }

    res.redirect('/profile/' + to);
});

router.get('/unfollow/:username/:toUsername', async function (req, res) {
    var to = req.params.toUsername;
    var from = req.params.username;
    if (to != from) {
        const perfilPropio = await Profile.findOne({ username: req.params.username });
        for (following in perfilPropio.following) {
            if (perfilPropio.following[following].username == to) {
                perfilPropio.following.splice(following, 1);
                perfilPropio.save();
            }
        }

        const perfilToUnfollow = await Profile.findOne({ username: req.params.toUsername });
        for (follower in perfilToUnfollow.followers) {
            if (perfilToUnfollow.followers[follower].username == from) {
                perfilToUnfollow.followers.splice(follower, 1);
                perfilToUnfollow.save();
            }
        }
    }

    res.redirect('/profile/' + to);
});

router.post('/mod-profile/:username', async function (req, res) {
    //console.log("MODIFICA PERFIL\n"+JSON.stringify(req.body))
    //console.log(req.file);
    if (req.user.username == req.params.username) {
        const perfil = await Profile.findOne({ username: req.params.username });

        if ((!req.body.nameField != perfil.name) && req.body.nameField) {
            perfil.name = req.body.nameField;
        }
        if ((!req.body.lastnameField != perfil.lastName) && req.body.lastnameField) {
            perfil.lastName = req.body.lastnameField;
        }
        if ((!req.body.biosField != perfil.bios) && req.body.biosField) {
            perfil.bios = req.body.biosField;
        }
        await perfil.save();
        res.redirect('/profile/' + req.params.username);
    }
});

router.get('/delete-post/:username/:idPost', async function (req, res) {
    if (req.user.username == req.params.username) {
        const post = await Post.findOne({ _id: req.params.idPost });
        if (post.type == "image") {
            fs.unlink(('.' + post.image), function(err) {
                if (err) throw err;
            });
        }
        for (coment in post.comments) {
            await Comment.deleteOne({ _id: post.comments[coment]._id});
        }
        for (like in post.likes) {
            await Like.deleteOne({ _id: post.likes[like]._id });
        }

        await post.remove();
    }

    res.redirect('/profile/' + req.user.username);
});

router.post('/add-img-portada', async function (req, res) {
    uploadPortada(req, res, async err => {
        if (err) {
            console.log("ERROR PORTADA" + JSON.stringify(req.body));
            res.redirect('profile/' + req.body.usernameImgPortada);
        } else {
            console.log("PORTADA BIEN " + JSON.stringify(req.body));
            res.redirect('profile/' + req.body.usernameImgPortada);
        }
    });
});

router.post('/add-img-profile', async function (req, res) {
    uploadProfile(req, res, async err => {
        if (err) {
            console.log("ERROR PROFILE " + JSON.stringify(req.body));
            res.redirect('profile/' + req.body.usernameImgPerfil);
        } else {
            console.log("PROFILE " + JSON.stringify(req.body));
            res.redirect('profile/' + req.body.usernameImgPerfil);
        }
    });
});

router.post('/get_profile/', async function(req,res){
    const auth = await Authentication.findOne({username: req.body.username});
    if(req.body.token == auth._id){
        const perfil = await Profile.findOne({username: req.body.usernameProfile});
        res.send(perfil);
    }else{
        res.send("No autorizado");
    }
});

const storage = multer.diskStorage({
    destination: './public/imgs',
    filename: async function (req, file, cb) {
        console.log(JSON.stringify(req.body));
        if (req.body.usernameImgPerfil) {
            var name = req.body.usernameImgPerfil + "_perfil_" + path.extname(file.originalname);
            cb(null, name)
            const perfil = await Profile.findOne({ username: req.body.usernameImgPerfil });
            perfil.image = "/public/imgs/" + name;
            await perfil.save();
        }
        if (req.body.usernameImgPortada) {
            var name = req.body.usernameImgPortada + "_portada_" + path.extname(file.originalname);
            cb(null, name)
            const perfil = await Profile.findOne({ username: req.body.usernameImgPortada });
            perfil.landscape = "/public/imgs/" + name;
            await perfil.save();
        }

    }
});

//Init
const uploadPortada = multer({
    storage: storage
}).single('imagenPortadaField');

const uploadProfile = multer({
    storage: storage
}).single('imagenProfileField');

module.exports = router;