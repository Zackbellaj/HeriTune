const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me', auth, userController.getProfile);
router.get('/matches', auth, userController.findMatches); // La route magique pour Awa

module.exports = router;