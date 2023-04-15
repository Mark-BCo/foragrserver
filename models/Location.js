const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  commonname: {
    type: String,
    required: true
  },
  plantdetail: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
}, {timestamps: true});

module.exports = mongoose.model('Location', LocationSchema);

// Nested Documents
// The value of a field could be a nested doicument
//