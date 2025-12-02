const User = require('../models/userModel');

// Récupérer son propre profil
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Erreur Serveur');
  }
};

// L'ALGORITHME DE MATCHING (Awa rencontre Ravi)
exports.findMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    
    // Trouver des utilisateurs qui ne sont PAS moi
    // Et qui ont au moins un intérêt culturel en commun
    const matches = await User.find({
      _id: { $ne: currentUser._id }, // Pas moi
      culturalInterests: { $in: currentUser.culturalInterests } // Match sur les tags
    }).select('-password'); // Ne pas renvoyer le mot de passe

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur Serveur');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, location, bio, culturalInterests } = req.body;
    
    // Préparer l'objet de mise à jour
    const updateData = {};
    if (username) updateData.username = username;
    if (location) updateData.location = location;
    if (bio) updateData.bio = bio;
    
    // Si interests est une string (venant de form-data), on la transforme en tableau
    if (culturalInterests) {
        updateData.culturalInterests = typeof culturalInterests === 'string' 
            ? culturalInterests.split(',').map(tag => tag.trim()).filter(t => t) 
            : culturalInterests;
    }

    // Gestion de l'avatar (si un fichier est envoyé)
    if (req.file) {
      updateData.avatar = req.file.path; // On enregistre le chemin
    }

    // Mise à jour en base
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true } // Renvoie l'objet modifié
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur Serveur');
  }
};