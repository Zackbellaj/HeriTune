const Track = require('../models/trackModel');

exports.uploadTrack = async (req, res) => {
  try {
    // 1. Debug : Voir ce que le serveur reçoit
    console.log("Body (Textes):", req.body);
    console.log("Files (Fichiers):", req.files);

    // 2. Vérification que les fichiers sont bien là
    if (!req.files || !req.files['audio']) {
        return res.status(400).json({ msg: 'Erreur: Le fichier audio est manquant (clé attendue: "audio")' });
    }

    // 3. Récupération des données
    const { title, origin, tradition, ritualContext, therapeuticFunction } = req.body;
    
    // CORRECTION MAJEURE ICI :
    // On mappe le chemin du fichier vers 'audioUrl' pour satisfaire le Modèle
    const audioPath = req.files['audio'][0].path; 
    const coverPath = req.files['image'] ? req.files['image'][0].path : null;

    // 4. Création de l'objet
    const newTrack = new Track({
      title,
      artist: req.user.id, // Vient du token JWT
      audioUrl: audioPath, // <<-- C'est ici que ça bloquait (nom incorrect avant)
      coverImage: coverPath,
      origin,   // <<-- Doit être envoyé via Form-Data
      tradition,
      ritualContext,
      therapeuticFunction
    });

    const track = await newTrack.save();
    res.json(track);

  } catch (err) {
    console.error("Erreur Backend:", err);
    res.status(500).json({ msg: 'Erreur Serveur', error: err.message });
  }
};

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find().populate('artist', 'username location avatar').sort({ createdAt: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).send('Erreur Serveur');
  }
};