// models/PersonalDetails.js
const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hobby: { type: String, required: true },
  occupation: { type: String, required: true },
  placesVisited: { type: String, required: true },
  favoriteArtist: { type: String, required: true },
  musician: { type: String, required: true },
  dob: { type: Date, required: true },
  file: { type: String, required: false }  // Store file path
});

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
