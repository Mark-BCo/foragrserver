const mongoose = require('mongoose');

// Database connection - used in fo-server.js - see .env
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;