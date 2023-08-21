const path = require('path');
const http = require('http');
const express = require("express");
const socket = require('socket.io');
const formatMessage = require('./app/utils/messages');
const { userJoint, getCurrentUser, userLeave, getRoomUsers } = require('./app/utils/users');
const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', s => {
    s.on('joinRoom', ({username, room}) => {
        const user = userJoint(s.id, username, room);

        s.join(user.room);
        // Welcome current user
        s.emit('message', formatMessage('Notice', `Welcome to chat ${user.username}`));

        //Broadcast when a new user connects
        s.broadcast.to(user.room).emit('message',
            formatMessage('Notice', `${user.username} has joined the chat`));

        //Send users and room data
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });

    // Lister for chatMessage
    s.on('chatMessage', (message) => {
        const user = getCurrentUser(s.id);
        //io is used to message everybody
        io.to(user.room).emit('message', formatMessage(user.username, message));
    });

    //Run when client disconnects
    s.on('disconnect', () => {
        const user = userLeave(s.id);
        if (user) {
            io.to(user.room).emit('message',
                formatMessage('Notice', `${user.username} has left the room`));

            //Send users and room data
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

});

app.use(express.static(path.join(__dirname, 'public')));

// app.get("/", (req, res) => {
//     res.send("<h2>Hello Worlds .!!!...</h2>");
// });

server.listen(3000, () => {
    console.log("Started");
});