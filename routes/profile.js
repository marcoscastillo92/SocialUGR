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
        //console.log(posts[i].fecha);
        posts[i].comentarios = await Comment.find({idPost: posts[i]._id});
        //console.log(posts[i]);
    }
    var user = {username:"marcoscastillo"};
    res.render('profile', {perfil:perfil[0], posts:posts, user:user});
});

router.get('/profile-add', async function(req, res){
    const followers = 0;
    const following = 0;
    const perfil = new Profile({username:'pepe', name:'PEPE', lastName:'Castillo', bios: "Estudiante de 3º de Ingeniería Informática en la UGR", image:"perfil.jpg", landscape:"paisaje.jpg", followers: followers, following: following});
    perfil.save();
    //const post = new Post({username:"marcoscastillo", description:"Esto es un post de prueba", image:"paisaje.jpg"});
    //post.save();
    //var {_id} = await Post.findOne({username: "marcoscastillo"});
    //const comment = new Comment({username:"marcoscastillo", comment:"Esto es OTRO comentario de prueba", idPost:_id});
    //comment.save();
    res.redirect('/profile/marcoscastillo');
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

router.post('/mod-profile/:username', async function (req, res) {
    console.log("MODIFICA PERFIL\n"+JSON.stringify(req.body))
    const perfil = await Profile.findOne({username: req.params.username});
    if((req.body.imagenPerfilField != perfil.image) && req.body.imagenPerfilField){
        perfil.image = req.body.imagenPerfilField;
    }
    if((!req.body.nameField != perfil.name) && req.body.nameField){
        perfil.name = req.body.nameField;
    }
    if((!req.body.lastnameField != perfil.lastName) && req.body.lastnameField){
        perfil.lastName = req.body.lastnameField;
    }
    // if((!req.body.genderField != perfil.gender) && req.body.genderField){
    //     perfil.gender = req.body.genderField;
    // }
    if((!req.body.imagenPortadaField != perfil.landscape) && req.body.imagenPortadaField){
        perfil.landscape = req.body.imagenPortadaField;
    }
    if((!req.body.biosField != perfil.bios) && req.body.biosField){
        perfil.bios = req.body.biosField;
    }
    await perfil.save();
    res.redirect('/profile/'+req.params.username);
  });

module.exports = router;