const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

server.listen(8080);

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

console.log("Servicio Socket.io iniciado");