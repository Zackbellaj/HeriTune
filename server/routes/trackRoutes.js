const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Route publique : voir les découvertes
router.get('/', trackController.getAllTracks);

// Route privée : uploader un chant (Audio + Image optionnelle)
router.post('/', [auth, upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }])], trackController.uploadTrack);

module.exports = router;