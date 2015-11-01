var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('new game', function(msg, x, y){
    io.emit('new game', msg, x, y);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

