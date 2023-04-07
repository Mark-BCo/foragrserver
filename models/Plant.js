const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema ({
    commonname: {
        type: String,
        required: true
    },
    scientificname: {
        type: String,
        required: false
    },
    species: {
        type: String,
        required: false
    },
    habitat: {
        type: String,
        required: false
    }   
})

module.exports = mongoose.model('plants', plantSchema);

