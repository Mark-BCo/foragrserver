const mongoose = require('mongoose');

// default role: "User" roles set in application
const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
            type: [String],
            default: ["User"]
    },
    active: {
        type: Boolean,
        default: true
    },
    // jwt refresh token for https authorisation
    refreshToken: String,
}, {timestamp: true})

module.exports = mongoose.model('users', userSchema);

