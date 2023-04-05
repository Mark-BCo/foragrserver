const mongoose = require('mongoose')

const proSchema = new mongoose.Schema ({

    orgname: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    town: {
        type: String,
    },
    county: {
        type: String,
    },
    postcode: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    charity: {
        type: Number,
    }, 
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('pros', proSchema)