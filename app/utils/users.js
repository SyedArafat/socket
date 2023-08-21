const users = [];

// Join users to chat
const userJoint = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);

    return user;
}

//Get current user
const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
}

// User leaves chat
const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get total room users

const  getRoomUsers = (room) => {
    return users.filter(user => user.room === room );
}

module.exports = {
    userJoint,
    getCurrentUser,
    userLeave,
    getRoomUsers
}