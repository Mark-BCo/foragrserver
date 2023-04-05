const express = require('express')
const router = express.Router()
const locationController = require('../controllers/locationController')

router.route('/')
    .get(locationController.getAllLocations)
    .post(locationController.createNewLocation)
    .delete(locationController.deleteAllLocations)

router.route('/last')
    .get(locationController.getLastLocation)

router.route('/name')
    .get(locationController.getPlantNameLocation)

module.exports = router;
