const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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
    }
})

module.exports = mongoose.model('profile', ProfileSchema);
