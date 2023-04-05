Model Notes

1. Document Based Model Schemas used to store information the MongoDB database
2. Different than a relational database, document based models have felxible schemas instead of storing data in fixed rows and columns
3. It is important to retain data integrity by ensuring that each document used in some way relates to uses of the application
4. It is possible to reference another collection or document through mongoose - see Example Profile Schema that refrences the user object.

******** Example Profile Schema **********

<!-- const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    bio: {
        type: String,
        required: false
    },
    craft: {
        type: Boolean,
        default: false
    },
    forage: {
        type: Boolean,
        default: false
    },
    eat: {
        type: Boolean,
        default: false
    },
    lore: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('profile', ProfileSchema); -->
