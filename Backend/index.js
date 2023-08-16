const path = require('path');
const http = require('http');
const express = require("express");
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', s => {
    // Welcome current user
    s.emit('message', 'Welcome to chat');

    //Broadcast when a new user connects
    s.broadcast.emit('message', 'A user has joined the chat');

    //Run when client disconnects
    s.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

});

app.use(express.static(path.join(__dirname, 'public')));

// app.get("/", (req, res) => {
//     res.send("<h2>Hello Worlds .!!!...</h2>");
// });

server.listen(3000, () => {
    console.log("Started");
});