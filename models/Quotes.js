const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
    quote_name: {
        type: String,
        required: true
    },
    quote_desc: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Quotes', QuoteSchema);