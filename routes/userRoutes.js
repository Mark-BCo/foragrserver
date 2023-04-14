const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')


router.route('/')
    .get(verifyJWT, userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/singleuser')
    .get(userController.getSingleUser)

router.route('/role')
    .get(userController.getUserByRole)

router.route('/:username')
    .get(userController.getUserByName)

router.route('/:id')
    .get(userController.getUserById)

router.route('/:id/image')
    .patch(userController.updateUserImage)


// router.get('/', (req, res) => res.send)
module.exports = router

