const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')

router.route('/')
    .get(profileController.getUserProfile)
    .delete(profileController.deleteAllProfiles)
    .post(profileController.updateProfile)

// router.route('/:id')
//     .patch(profileController.updateProfile)
//     .get(profileController.getUserProfileById)


module.exports = router