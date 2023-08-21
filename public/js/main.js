const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const socket = io("http://localhost:3201", {
    transports: ['websocket']
})

// Message from server
socket.on('message', message => {
    outputMessage(message);

    // After displaying message scroll down to the last message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Join chat room
socket.emit('joinRoom', {username, room});

//Get room and users
socket.on('roomUsers', ({room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

// Output message to DOM
const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span></p>
                <p class="text"> ${message.text} </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

const outputRoomName = (room) => {
    roomName.innerText = room;
}

const outputUsers = (users) => {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

// Message Submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.msg.value;

    // Emitting a message to the server
    socket.emit('chatMessage', message);

    // clear message input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});