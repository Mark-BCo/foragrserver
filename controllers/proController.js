const Pro = require('../models/prouser')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// To sign up as an organistation

const getAllPros = asyncHandler(async (req, res) => {
    const pros = await Pro.find().select('-password').lean();
    if (!pros?.length) {
        return res.status(400).json({ message: 'None found' })
    }
    res.json(pros);
})


const createNewPro = asyncHandler(async (req, res) => {

    const { orgname, ownername, address, town, county, postcode,
        business, website, email, charity, password } = req.body;

    console.log(req.body)

    if (!orgname) {
        return res.status(400).json({ message: 'Please enter an organistation name' })
    }
    if (!ownername) {
        return res.status(400).json({ message: 'Please enter your full name' })
    }
    if (!postcode) {
        return res.status(400).json({ message: 'Please enter a postcode' })
    }
    if (!business) {
        return res.status(400).json({ message: 'Please enter the nature of your business' })
    }
    if (!website) {
        return res.status(400).json({ message: 'Please add your website' })
    }
    if (!email) {
        return res.status(400).json({ message: 'Please add your email' })
    }
    if (!password) {
        return res.status(400).json({ message: 'A password is required' })
    }


    const duplicatePro = await Pro.findOne({ orgname }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicatePro) {
        return res.status(409).json({ message: 'This organisation has already registered' })
    }

    const duplicateEmail = await Pro.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({ message: 'This email is already in use' })
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const proObject = {
        orgname, ownername, address, town, county, postcode,
        business, website, email, charity, hashedPwd
    }

    const pros = await Pro.create(proObject)

    if (pros) {
        res.status(201).json({ message: `New organsiation ${orgname} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const updatePros = asyncHandler(async (req, res) => {

    const { orgname, ownername, address, town, county, postcode,
        business, website, email, charity, password } = req.body;
    if (!pros?.length) {
        return res.status(400).json({ message: 'None found' })
    }

    if (!orgname) {
        return res.status(400).json({ message: 'Please enter an organistation name' })
    }
    if (!ownername) {
        return res.status(400).json({ message: 'Please enter your full name' })
    }
    if (!postcode) {
        return res.status(400).json({ message: 'Please enter a postcode' })
    }
    if (!business) {
        return res.status(400).json({ message: 'Please enter the nature of your business' })
    }
    if (!website) {
        return res.status(400).json({ message: 'Please add your website' })
    }
    if (!email) {
        return res.status(400).json({ message: 'Please add your email' })
    }
    if (!password) {
        return res.status(400).json({ message: 'A password is required' })
    }
    res.json(pros);
})

module.exports = {
    getAllPros,
    createNewPro,
    updatePros
}