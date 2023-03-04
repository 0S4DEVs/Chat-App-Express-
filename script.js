const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Set up the routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Set up the socket.io connection
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// Start the server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
