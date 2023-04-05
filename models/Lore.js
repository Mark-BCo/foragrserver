const mongoose = require('mongoose')

const LoreSchema = new mongoose.Schema({
    lore_name: {
        type: String,
        required: true
    },
    lore_desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Lore', LoreSchema);