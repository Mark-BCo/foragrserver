// Async handler: Without the express-async-handler try catch blocks are required
const asyncHandler = require('express-async-handler');

// bcrypt password hashing function - https://codahale.com/how-to-safely-store-a-password/
const bcrypt = require('bcrypt');

// Requiring the user model
const User = require('../models/user')
const Profile = require('../models/Profile')

// @desc get all users
// @route method:GET endpoint:/user
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users);
})

// @desc get all users
// @route method:GET endpoint:/user
// @access Private
const getSingleUser = asyncHandler(async (req, res) => {
    const username = new RegExp(req.params?.usernames)
    if (username !== ' ') {
        try {
            const user = await User.findOne({ username: username })
            res.status(200).json(user)
        } catch {
            res.status(404).json({ message: "No user found" })
        }
    }
})

// get user by id
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("No such User");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// @desc get user by professional role and matching to user profile
// @route method:GET endpoint:/user/role/:id
// @access Private
const getUserByRole = async (req, res) => {

    const user = await User.find({ roles: 'Professional' }).select('-password').exec()

    const { id } = req.body

    const profileId = await Profile.findById(id).exec()
    const userId = await User.findById(id).select('-password').exec()

    const profileObject = { id }
    const userObject = { id }

    console.log("Profile: ", profileId)

    if (profileObject.id === userObject.id) {
        console.log(userId)
        res.status(200).json(profileId)
    } else {
        console.log("Profiles do not match")

    }
}

// @desc GET user by name
// @route GET users/:username
const getUserByName = asyncHandler(async (req, res) => {
    const userTitle = new RegExp(req.params?.commonname, 'i')
    if (userTitle !== '') {
        try {
            const searchResults = await User.find({ username: userTitle })
            res.status(200).json(searchResults)
        } catch {
            res.status(404).json({ message: "No matching user found" })
        }
    }
})

// @desc Create a new user
// @route method:POST endpoint:/user
// @access Private
const createNewUser = asyncHandler(async (req, res) => {

    const { username, firstname, lastname, email, roles, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Lean to not get the entire document - we are only checking for a user name
    // Collation and the .locale property here checks for case insenisivity - see docs @ https://www.mongodb.com/docs/manual/reference/collation-locales-defaults/
    const duplicateUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateUser) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const duplicateEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // If the roles array does not exist or has no length the user object is created without the roles
    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, firstname, lastname, email, "password": hashedPwd }
        : { username, firstname, lastname, email, "password": hashedPwd, roles }

    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route method:PATCH endpoint:/user
// @access Private
const updateUser = asyncHandler(async (req, res) => {

    const { id, username, roles, active, password } = req.body

    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Lean to not get the entire document - we are only checking for a user name
    // Collation and the .locale property here checks for case insenisivity - see docs @ https://www.mongodb.com/docs/manual/reference/collation-locales-defaults/
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        user.password = await bcrypt.hash(password, 10) // Salt rounds
    }
    
    const updatedUser = await user.save()

    res.json({ message: `Updated ${updatedUser.username} updated` })
})

// @desc Delete a User
// @route method:DELETE endpoint:/user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'User ID required' })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID ${result._id} deleted`;
    res.json(reply);
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getSingleUser,
    getUserByName,
    getUserById,
    getUserByRole
}

// Testing for get user by role
    // console.log("Profile ID: ", profileObject)
    // console.log("User ID: ", userObject)
    // console.log(user)
    // const p = await Profile.find(profileObject)
    // console.log(p)
    // console.log("User ID 2: ", userId)
    // console.log("User: ", user)
    // console.log("Profile: ", profileId)
    // if (user) {
    //     res.status(200).json(user)

    // } else {
    //     res.status(404).json("Role does not exist")
    // }