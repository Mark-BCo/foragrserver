const Profile = require('../models/Profile')
const User = require('../models/user')
const asyncHandler = require('express-async-handler');

// multer is middleware for handling multipart/form data
const multer = require('multer')

// Storing the photo uploads in the disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profile/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

// returning the multer instance - multer is used in the createNewLocation function for uploding photos
const upload = multer({ storage: storage })

// Get the users profile
const getUserProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.find()
    if (!profile?.length) {
        return res.status(400).json({ message: 'No profile found' })
    }
    res.json(profile);
})

// Get the users profile by ID
const getUserProfileById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const profile = await Profile.findById(id)
    if (!profile?.length) {
        return res.status(400).json({ message: 'No profiles found' })
    } else {
        res.json(profile);
    }
})


// This code watches for a change event in the user document and inserts the user document into the
// profile document - currently not working, needs development
// let userDocumentId
// // create a change stream
const changeStream = User.watch()
// listen to the change stream a create a new profile
changeStream.on('change', async (change, req, res) => {
    if (change.operationType === 'insert') {
        const newProfile = change.fullDocument
        await Profile.create(newProfile)
        // console.log(newProfile)
        // userDocumentId = newProfile._id
    }
})

// @desc Edit a user profile
// @route method:POST endpoint:/profile
// @access Private
const updateProfile = asyncHandler(async (req, res,) => {

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

    // const {id} = req.params._id
    // const {id} = req.body

    // const userId = User.findById(id).lean().exec()

    // console.log(userId)

    const { id } = req.body

    User.findById(id).select('-password').exec()

    const userObject = { id }

    console.log(userObject.id)

    const { username, bio, forage, craft, eat, lore } = req.body

    const updatedProfile = await Profile.findByIdAndUpdate({_id: userObject.id},{
        username,
        bio,
        forage,
        craft,
        eat,
        lore,
        image: {
            data: file.buffer,
            contentType: file.mimetype,
        },
    })

    // return the reponse
    res.status(201).json(updatedProfile)

    //  // Does the user exist to update?
    //  const profile = await Profile.findById(id).exec()

    //  if (!profile) {
    //      return res.status(400).json({ message: 'Profile not found' })
    //  }
 
    //  // Check for duplicate 
    //  const duplicate = await Profile.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
 
    //  // Allow updates to the original user 
    //  if (duplicate && duplicate?._id.toString() !== id) {
    //      return res.status(409).json({ message: 'Duplicate username' })
    //  }

    //  profile.bio = bio
    //  profile.forage = forage
    //  profile.craft = craft
    //  profile.eat = eat
    //  profile.lore = lore

    //  const updatedProfile = await profile.save()

    //  res.sjson({message: `${updatedProfile.username} updated`})
    // Create a new profile model
    


    // Profile.findByIdAndUpdate(
    //     id, 
    //     {
    //     bio: bio,
    //     forage: forage, 
    //     craft: craft,
    //     eat: eat,
    //     lore: lore,
    //     file: file
    //     },
    //         { new: true }
    // )
    // .then(updatedProfile => {
    //   // handle the updated profile
    //   console.log(updatedProfile);
    // })
    // .catch(error => {
    //   // handle the error
    //   console.error(error);
    // });
})

const deleteAllProfiles = asyncHandler(async (req, res) => {
    const profileData = await Profile.deleteMany().exec()
    if (profileData) {
        res.status(201).json({ message: 'All profiles deleted' })
    } else {
        res.status(400).json({ message: 'Profiles not deleted' })
    }
})

module.exports = {
    getUserProfile,
    getUserProfileById,
    updateProfile,
    deleteAllProfiles
}

/*  ****************** UNUSED ***************************** */

// find the last created user - the pitfall of this is if two users register at the same time
    // It would be better here if MongoDB Atlas created a new profile document when a new user is inserted
    // We could then reference this change event and update the users profile >>
    // User.watch()
    // .on('change', data => console.log(data.documentKey))
    // const user = await User.findOne({ new: true }).select("-password").sort({ _id: -1 })

    // Profile.findById(userDocumentId, (err, profileDocument) => {

    //     if (err) {
    //         console.error(err)
    //     } else {

    //         const {bio, forage, craft, eat, lore} = req.body

    //         profileDocument = { bio, forage, craft, eat, lore }

    //         profileDocument.save((err, updatedDocument) => {
    //             if (err) {
    //                 console.error(err)
    //             } else {
    //                 console.log("updated document with ID ${updatedDocument._id")
    //             }
    //         })

    // if (newProfile) { //created
    //     res.status(201).json({ message: `New profile for ${userDocument} created` })
    // } else {
    //     res.status(400).json({ message: 'Invalid user data received' })
    // }

    //     }
    // })

    // const id = req.params.id;

    // try {

    //     const profile = await Profile.findById(id).exec();
    //     if (profile) {
    //         const { password, ...otherDetails } = profile._id
            
    //         const { bio, forage, craft, eat, lore } = req.body

    //         Profile.updateOne(
    //             { _id: userDocumentId },
    //             {
    //                 bio: bio,
    //                 forage: forage,
    //                 craft: craft,
    //                 eat: eat,
    //                 lore: lore
    //             },
    //             (err, result) => {
    //                 if(err) {
    //                     console.error(err)
    //                 } else {
    //                     console.log(`Updated ${result} document(s)`)
    //                 }
    //             }
    //         )
    //         res.status(200).json(otherDetails);
    //     } else {
    //         res.status(404).json("No such Profile");
    //     }
    // } catch (error) {
    //     res.status(500).json(error);
    // }