const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment.js');
const User = require('../models/user.js');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

router.get('/profile/:username', isLoggedIn, async function(req, res){
    //console.log("EN RENDERIZAR PERFIL" + JSON.stringify(req.params.username));
    const perfil = await Profile.findOne({username: req.params.username});
    const user = await User.findOne({username: req.user.username})
    if(perfil){
        const posts = await Post.find({username: req.params.username});
        res.render('profile', {perfil: perfil, posts:posts, user:user});
    }else{
        res.render('notfound', {user:user});
    }
});

router.get('/profile-add', async function(req, res){
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

router.get('/follow/:username/:toUsername', async function(req, res){
    var to = req.params.toUsername;
    var from = req.params.username;
    if(to != from){
        const perfilPropio = await Profile.findOne({username: req.params.username}, function(err, doc){
            if(doc.following.indexOf(to) == -1){
                doc.following.push(to)
                doc.save();
            }
            //console.log("PROPIO: "+JSON.stringify(doc.following));
        });
        const perfilToFollow = await Profile.findOne({username: req.params.toUsername}, function(err, doc){
            if(doc.followers.indexOf(from) == -1){
                doc.followers.push(from);
                doc.save();
            }
            //console.log("TO FOLLOW: "+JSON.stringify(doc.followers));
        });
    }
    
    res.redirect('/profile/'+to);
});

router.get('/unfollow/:username/:toUsername', async function(req, res){
    var to = req.params.toUsername;
    var from = req.params.username;
    if(to != from){
        const perfilPropio = await Profile.findOne({username: req.params.username}, function(err, doc,){
            var index = doc.following.indexOf(to);
            if(index != -1){
                doc.following.splice(index, 1);
                //console.log("PROPIO: "+JSON.stringify(doc.following));
                doc.save();
            }
        });
        const perfilToFollow = await Profile.findOne({username: req.params.toUsername}, function(err, doc){
            var index = doc.followers.indexOf(from)
            if(index != -1){
                doc.followers.splice(index,1);
                //console.log("TO FOLLOW: "+JSON.stringify(doc.followers));
                doc.save();
            }
        });
    }

    res.redirect('/profile/'+to);
});

router.post('/mod-profile/:username', async function (req, res){
    //console.log("MODIFICA PERFIL\n"+JSON.stringify(req.body))
    //console.log(req.file);
    if(req.user.username == req.params.username){
        const perfil = await Profile.findOne({username: req.params.username});
        
        var extension = req.body.imagenPerfilField.split(".")[1];
        if((req.body.imagenPerfilField != perfil.image) && req.body.imagenPerfilField){
            perfil.image = perfil.username+"_perfil"+extension;
        }
        if((!req.body.nameField != perfil.name) && req.body.nameField){
            perfil.name = req.body.nameField;
        }
        if((!req.body.lastnameField != perfil.lastName) && req.body.lastnameField){
            perfil.lastName = req.body.lastnameField;
        }
        if((!req.body.imagenPortadaField != perfil.landscape) && req.body.imagenPortadaField){
            perfil.landscape = req.body.imagenPortadaField;
        }
        if((!req.body.biosField != perfil.bios) && req.body.biosField){
            perfil.bios = req.body.biosField;
        }
        await perfil.save();
        res.redirect('/profile/'+req.params.username);
    }
  });

  router.post('/add-img-portada', async function(req, res){
    if(req.user.username == req.body.usernameImgPortada || req.user.username == req.body.usernameImgPerfil){
        uploadPortada(req, res, async err =>{
            if(err){
                console.log("ERROR PORTADA" + JSON.stringify(req.body));
                res.redirect('profile/' + req.body.usernameImgPortada);
            }else{
                console.log("PORTADA BIEN " + JSON.stringify(req.body));
                res.redirect('profile/' + req.body.usernameImgPortada);
            }
        });
    }
  });

  router.post('/add-img-profile', async function(req, res){
    console.log("ENTRAAAAAAAAAAAA IMG");
    console.log(JSON.stringify(req.user))
    if(req.user.username == req.body.usernameImgPortada || req.user.username == req.body.usernameImgPerfil){
        uploadProfile(req, res, async err =>{
            if(err){
                console.log("ERROR PROFILE " + JSON.stringify(req.body));
                res.redirect('profile/' + req.body.usernameImgPerfil);
            }else{
                console.log("PROFILE " + JSON.stringify(req.body));
                res.redirect('profile/' + req.body.usernameImgPerfil);
            }
        });
    }
  });

const storage = multer.diskStorage({
    destination: './public/imgs',
    filename: async function(req, file, cb){
        console.log(JSON.stringify(req.body));
        if(req.body.usernameImgPerfil){
            var name = req.body.usernameImgPerfil+ "_perfil_" + path.extname(file.originalname); 
            cb(null, name)
            const perfil = await Profile.findOne({username: req.body.usernameImgPerfil});
            perfil.image = "/public/imgs/"+name;
            await perfil.save();
        }
        if(req.body.usernameImgPortada){
            var name = req.body.usernameImgPortada +"_portada_"+ path.extname(file.originalname); 
            cb(null, name)
            const perfil = await Profile.findOne({username: req.body.usernameImgPortada});
            perfil.landscape = "/public/imgs/"+name;
            await perfil.save();
        }
        //JOSE
        
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