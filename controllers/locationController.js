const asyncHandler = require('express-async-handler');
const Location = require('../models/Location')

// multer is middleware for handling multipart/form data
const multer = require('multer')

// Storing the photo uploads in the disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

// returning the multer instance - multer is used in the createNewLocation function for uploding photos
const upload = multer({ storage: storage })

// @desc get all users
// @route method:GET endpoint:/user
// @access Private
const getAllLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find().select().lean();
    if (!locations?.length) {
        return res.status(400).json({ message: 'No locations found' })
    }
    res.json(locations);
})

const getLastLocation = asyncHandler(async (req, res) => {

    const last = await Location.find().sort({ $natural: -1 }).limit(1)

    if (!last?.length) {
        return res.status(400).json({ message: 'No' })
    }

    res.json(last);
})


// @desc create new location
// @route method:POST endpoint:/locations
// @access Private
const createNewLocation = asyncHandler(async (req, res) => {

    // File Upload promise
    const file = await new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(req.file);
            }
        });
    });

    // location body
    const { username, name, location, commonname } = req.body


    // const a = (typeof name)
    // const b = (typeof location)
    // const c = (typeof commonname)
    // console.log(a)
    // console.log(b)
    // console.log(c)

    // Split the location array into latitude and longitude
    const [latitude, longitude] = location.split(',').map(coord => Number(coord.trim()));

    // console.log(latitude)
    // console.log(longitude)

    // Create a new location model
    const newLocation = await Location.create({
        username,
        name,
        location: {
            type: 'Point',
            coordinates: [latitude, longitude],
        },
        commonname,
        image: {
            data: file.buffer,
            contentType: file.mimetype,
        },
    })

    // console.log(newLocation)
    // return the reponse
    res.status(201).json(newLocation)

})

// Deletes all locations
const deleteAllLocations = asyncHandler(async (req, res) => {

    const locationData = await Location.deleteMany().exec()

    if (locationData) {
        res.status(201).json({ message: 'All locations deleted' })
    } else {
        res.status(400).json({ message: 'Locations not deleted' })
    }

})

// Unused
const getPlantNameLocation = asyncHandler(async (req, res) => {

    const locations = await Location.find().select().lean();

    res.json(locations)

})

module.exports = {
    getAllLocations,
    createNewLocation,
    getLastLocation,
    deleteAllLocations,
    getPlantNameLocation,
}