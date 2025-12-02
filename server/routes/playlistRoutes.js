const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const auth = require('../middleware/auth');

router.post('/', auth, playlistController.createPlaylist);
router.post('/:id/collaborators', auth, playlistController.addCollaborator);

module.exports = router;