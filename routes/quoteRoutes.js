const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quoteController')

router.route('/')
    .get(quoteController.getAllQuotes)
    .post(quoteController.createNewQuote)
    .delete(quoteController.deleteAllQuotes)

module.exports = router