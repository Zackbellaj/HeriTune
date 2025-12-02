const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/me', auth, userController.getProfile);
router.get('/matches', auth, userController.findMatches); // La route magique pour Awa
router.put('/me', [auth, upload.single('avatar')], userController.updateProfile);
module.exports = router;