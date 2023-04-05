const mongoose = require('mongoose')

const RecipieSchema = new mongoose.Schema({
    recipie_name: {
        type: String,
        required: true
    },
    recipie_desc: {
        type: String,
        required: true
    },
    recipie_ingredients: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Recipie', RecipieSchema);