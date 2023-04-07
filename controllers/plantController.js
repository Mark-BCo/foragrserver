const asyncHandler = require('express-async-handler');
const { Types, mongoose } = require('mongoose');
const Plants = {
    plants: require('../models/Plant'),
    setPlants: function (data) { this.plants = data }
}
const Crafts = {
    crafts: require('../models/Craft'),
    setCrafts: function (data) { this.plants = data }
}

// @desc GET get all plants
// @route GET /plants
const getAllPlants = asyncHandler(async (req, res) => {
    const plants = await Plants.plants.find().select().lean();
    if (!plants?.length) {
        return res.status(400).json({ message: 'None found' })
    }
    res.json(plants);
})

// @desc GET plants by name
// @route GET /plants/onePlant/:commonname
const searchPlantByName = asyncHandler(async (req, res) => {

    const plantTitle = new RegExp(req.params?.commonname, 'i')

    if (plantTitle !== '') {
        try {
            const searchResults = await Plants.plants.find({ commonname: plantTitle })
            res.status(200).json(searchResults)
        } catch {
            res.status(404).json({ message: "No matching plant found" })
        }
    }
})

// @desc POST create a new plant
// @route POST /plants
// @access Public
const createNewPlant = asyncHandler(async (req, res) => {

    const { commonname, scientificname, species, habitat,
        family, order, kingdom, name, location } = req.body;

    const plantObject = {
        commonname, scientificname, species, habitat,
        family, order, kingdom, name, location
    }

    const plants = await Plants.plants.create(plantObject)

    if (plants) {
        res.status(201).json({ message: `New plant ${commonname} created` })
    } else {
        res.status(400).json({ message: 'Invalid plant data received' })
    }
})

// @desc Update a plant
// @route method:PATCH endpoint:/plants
// @access Public
const updatePlants = asyncHandler(async (req, res) => {

    const { id, commonname, scientificname, species, habitat } = req.body;

    if (!id || !commonname || !scientificname || !species || !habitat) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const plants = await Plants.plants.findById(id).exec()

    console.log(plants)

    if (!plants) {
        return res.status(400).json({ message: 'Plant not found' })
    }

    plants.commonname = commonname
    plants.scientificname = scientificname
    plants.species = species
    plants.habitat = habitat

    console.log(plants)

    const updatedPlant = await plants.save()

    res.json({ message: `Updated ${updatedPlant.commonname} updated` })

})

// @desc Delete plant
// @route method:DELETE endpoint:/plants
const deletePlant = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Plant ID required' })
    }

    const plant = await Plants.plants.findById(id).exec()

    if (!plant) {
        return res.status(400).json({ message: 'Plant not found' });
    }

    const result = await plant.deleteOne();

    const reply = `Plant ${result.commonname} with ID ${result._id} deleted`;

    res.json(reply);

})

// @desc Delete plants
// @route method:DELETE endpoint:/plants
const deleteAllPlants = asyncHandler(async (req, res) => {

    const plantData = await Plants.plants.deleteMany().exec()

    if (plantData) {
        res.status(201).json({ message: 'All plants deleted' })
    } else {
        res.status(400).json({ message: 'Plants not deleted' })
    }

})

/* BELOW THIS LINE FOR FUTURE DEVELOPMENT */

const createNewCraft = asyncHandler(async (req, res) => {

    const { } = req.body;

    const duplicateCraft = await Crafts.findOne({}).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicateCraft) {
        return res.status(409).json({ message: 'This craft has already been added' })
    }

    const craftObject = {}

    const crafts = await Crafts.create(craftObject)

    if (crafts) {
        res.status(201).json({ message: `New plant ${ghd} created` })
    } else {
        res.status(400).json({ message: 'Invalid craft data received' })
    }
})

// @desc GET plant by craft
// @route GET plants/craft
const getCraft = asyncHandler(async (req, res) => {

    const craft = await Crafts.crafts.find()

    if (!craft?.length) {
        return res.status(400).json({ message: 'No crafts found' })
    }

    res.json(craft)

})

// @desc GET plant by location
// @route GET plants/location
const serachPlantByLocation = asyncHandler(async (req, res) => {


})

// @desc GET plant by lore
// @route GET plants/lore
const getLore = asyncHandler(async (req, res) => {


})

// @desc GET plant by edible
// @route GET plants/edible
const getEdible = asyncHandler(async (req, res) => {


})

// @desc GET plant by forage
// @route GET plants/forage
const getForage = asyncHandler(async (req, res) => {


})

module.exports = {
    getAllPlants,
    searchPlantByName,
    serachPlantByLocation,
    getCraft,
    getEdible,
    getForage,
    getLore,
    createNewPlant,
    createNewCraft,
    updatePlants,
    deletePlant,
    deleteAllPlants
}