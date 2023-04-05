const mongoose = require('mongoose');

// Plant data model - think of the differnt types of data we need to store
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

