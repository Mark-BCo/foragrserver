const mongoose = require('mongoose')

const CraftSchema = new mongoose.Schema({
    craft_name: {
        type: String,
        required: true
    },
    craft_desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    commonname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Craft', CraftSchema);