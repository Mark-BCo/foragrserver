const mongoose = require('mongoose');

// CONNECT TO MONGODB THROUGH MONGOOSE CONNECTION
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;