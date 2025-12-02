const Playlist = require('../models/playlistModel');

exports.createPlaylist = async (req, res) => {
  const { name } = req.body;
  try {
    const newPlaylist = new Playlist({
      name,
      creator: req.user.id,
      collaborators: [req.user.id] // Le créateur est le premier collaborateur
    });
    const playlist = await newPlaylist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).send('Erreur Serveur');
  }
};

// Ajouter Ravi comme collaborateur
exports.addCollaborator = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    const { userIdToAdd } = req.body; // L'ID de Ravi

    // Vérifier si je suis le créateur
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }

    // Ajouter si pas déjà présent
    if (!playlist.collaborators.includes(userIdToAdd)) {
        playlist.collaborators.push(userIdToAdd);
        await playlist.save();
    }
    
    res.json(playlist);
  } catch (err) {
    res.status(500).send('Erreur Serveur');
  }
};