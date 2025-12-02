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