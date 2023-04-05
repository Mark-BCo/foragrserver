const express = require('express');
const router = express.Router();
const proController = require('../controllers/proController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, proController.getAllPros)
    .post(proController.createNewPro)
    .patch(proController.updatePros)

module.exports = router;