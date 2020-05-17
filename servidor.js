const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
<<<<<<< HEAD

=======
>>>>>>> perfil


app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/login.html')
})

app.get('/feed', function(req, res){
    res.sendFile(__dirname + '/html/feed.html')
})

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/html/login.html')
})

app.get('/perfil', function(req, res){
  res.sendFile(__dirname + '/html/perfil.html')
})

app.get('/imgs/:imagen', function(req, res){
  res.sendFile(__dirname + '/imgs/'+req.params.imagen)
})

app.get('/css/:css', function(req, res){
  res.sendFile(__dirname + '/css/'+req.params.css)
})

const uri = "mongodb://localhost:27017/";
MongoClient.connect(uri, function(err, db) {
	server.listen(8080);
	var dbo = db.db("socialugr");
<<<<<<< HEAD
	dbo.createCollection("test", function(err, collection){
    	io.sockets.on('connection',
      function(client) {
        client.emit('my-address', {host:client.request.connection.remoteAddress,
          port:client.request.connection.remotePort});
        client.on('poner', function (data) {
          collection.insert(data, {safe:true}, function(err, result) {});
        });
        client.on('obtener', function (data) {
          collection.find(data).toArray(function(err, results){
            client.emit('obtener', results);
          });
        });
      });
    });
=======
>>>>>>> perfil
});

console.log("Servicio Socket.io iniciado");