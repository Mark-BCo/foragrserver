const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    craft: {
        type: Boolean,
        default: false
    },
    forage: {
        type: Boolean,
        default: false
    },
    eat: {
        type: Boolean,
        default: false
    },
    lore: {
        type: Boolean,
        default: false
    },
    image: {
        data: Buffer,
        contentType: String
      }
}, {timestamp: true})

module.exports = mongoose.model('profile', ProfileSchema);
