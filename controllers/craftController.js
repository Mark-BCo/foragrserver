const Craft = require('../models/Craft');
const asyncHandler = require('express-async-handler');

const createNewCraft = asyncHandler(async (req, res) => {

    const { craft_name, craft_desc, image, plant} = req.body

    const duplicateCraft = await Craft.findOne({ craft_name }).collation({locale: 'en', strength: 2}).lean().exec()
  
    if (duplicateCraft) {
        return res.status(409).json({ message: 'Duplicate craft' })
    }

    const craftObject = (!Array.isArray(plant) || !plant.length)
    ? { craft_name, craft_desc, image }
    : { craft_name, craft_desc, image, plant }

    const craft = await Craft.create(craftObject)

    if(craft) { //created
        res.status(201).json({ message: `New craft ${craft_name} created` })
    } else {
        res.status(400).json({ message: 'Invalid craft data received' })
    }
})

module.exports = {
    createNewCraft
}