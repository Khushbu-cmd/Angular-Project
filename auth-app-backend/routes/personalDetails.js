// routes/personalDetails.js
const express = require('express');
const multer = require('multer');
const PersonalDetails = require('../models/PersonalDetails');
const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Folder to save uploaded files
  limits: { fileSize: 1000000 }, // 1MB file limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  }
});

// Endpoint to handle personal details submission
// Endpoint to handle personal details submission
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Save personal details to the database
    const personalDetails = new PersonalDetails({
      username: req.body.username, // Ensure username is saved
      hobby: req.body.hobby,
      occupation: req.body.occupation,
      placesVisited: req.body.placesVisited,
      favoriteArtist: req.body.favoriteArtist,
      musician: req.body.musician,
      dob: req.body.dob,
      file: req.file ? req.file.path : null
    });

    await personalDetails.save();
    res.status(200).json({ message: 'Personal details saved successfully', personalDetails });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to fetch personal details for editing
router.get('/all', async (req, res) => {
  try {
    const personalDetails = await PersonalDetails.find();
    res.status(200).json(personalDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all personal details
router.get('/', async (req, res) => {
  try {
    const personalDetails = await PersonalDetails.find();
    res.status(200).json(personalDetails); // Return all personal details
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
