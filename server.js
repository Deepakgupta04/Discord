const path = require('path');
const http = require('http');
const express = require('express');
const sockerio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Setting static folder//
app.use(express.static (path.join(_dirname, 'public')));

//Run when client connects//
io.on('connection',socket =>{

//Welcome user
  socket.emit('message', 'Welcome to Discord!');

  //Broadcast when a user connects//
  socket.Broadcast.emit('message','A user has joined a chat');

  });
//run when client dissconnect//
  socket.on('dissconnect', () =>{
  io.emit('message','A user has left the chat');
  });
  //Listen for chatmessage
  socket.on('chatmessage', msg =>{
    io.emit('message', msg);
  });
});

const PORT =  3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port ${PORT}'));
