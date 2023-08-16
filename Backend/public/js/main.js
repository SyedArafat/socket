const socket = io("http://localhost:3201", {
    transports: ['websocket']
})

socket.on('message', message => {
    console.log(message);
});