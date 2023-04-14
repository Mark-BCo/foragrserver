const mongoose = require('mongoose');

// User data model
// See 'Model.MD' file in this folder 1 - 4
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
    // Decided that default role is User - Administrators and Managers are capable of setting roles in the application
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

    bio: {
        type: String,
        required: false
    },
    craft: {
        type: Boolean,
        default: false,
        required: false
    },
    forage: {
        type: Boolean,
        default: false,
        required: false
    },
    eat: {
        type: Boolean,
        default: false,
        required: false
    },
    lore: {
        type: Boolean,
        default: false,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String,
        required: false
      },
    isProfessional: {
        type: Boolean,
        default: false,
        required: false
    }
    
}, {timestamp: true})

module.exports = mongoose.model('users', userSchema);

