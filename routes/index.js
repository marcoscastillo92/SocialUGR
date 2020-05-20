const router = require('express').Router();

router.get('/', function(req, res){
    res.sendFile(__dirname + '/../public/html/login.html');
});

router.get('/feed', (req, res) => {
    res.render('feed');
    //res.sendFile(__dirname + '/public/html/feed.html');
});

router.get('/login', function(req, res){
    res.sendFile(__dirname + '/../public/html/login.html');
});

router.get('/profile', function(req, res){
    res.render('profile');
    //res.sendFile(__dirname + '/public/html/perfil.html');
});

// router.get('/imgs/:imagen', function(req, res){
//     res.sendFile(__dirname + '/imgs/'+req.params.imagen);
// });

// router.get('/css/:css', function(req, res){
//     res.sendFile(__dirname + '../public/css/'+req.params.css);
// });

module.exports = router;