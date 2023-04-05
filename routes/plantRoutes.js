const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const craftController = require('../controllers/craftController')

router.route('/')
    .get(plantController.getAllPlants)
    .post(plantController.createNewPlant)
    .patch(plantController.updatePlants)
    .delete(plantController.deletePlant)

router.route('/delete')
    .delete(plantController.deleteAllPlants)

router.route('/onePlant/:commonname')
    .get(plantController.searchPlantByName)
    .post(plantController.searchPlantByName)

router.route('/craft')
    .get(plantController.getCraft)

router.route('/craft')
    .post(craftController.createNewCraft)

module.exports = router;