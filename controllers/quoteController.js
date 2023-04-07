const asyncHandler = require('express-async-handler');
const Quote = require('../models/Quotes')

// @desc get all quotes
// @route method:GET endpoint:/quotes
// @access Public
const getAllQuotes = asyncHandler(async (req, res) => {
    const quotes = await Quote.find().lean().exec();
    if (!quotes?.length) {
        return res.status(400).json({ message: 'No quotes found' })
    }
    res.json(quotes);
})

// @desc Create a new quote
// @route method:POST endpoint:/quotes
// @access Public
const createNewQuote = asyncHandler(async (req, res) => {

    const { quote_name, quote_desc } = req.body;

    const quoteObject = {quote_name, quote_desc}

    const quotes = await Quote.create(quoteObject)

    if (quotes) {
        res.status(201).json({ message: `New quote by ${quote_name} created` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }

})

// delete all quotes
const deleteAllQuotes = asyncHandler(async (req, res) => {

    const quoteData = await Quote.deleteMany().exec()

    if (quoteData) {
        res.status(201).json({ message: 'All quotes deleted' })
    } else {
        res.status(400).json({ message: 'Quotes not deleted' })
    }

})

module.exports = {
    getAllQuotes,
    createNewQuote,
    deleteAllQuotes
}

