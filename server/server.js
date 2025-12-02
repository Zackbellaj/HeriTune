const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Connexion à la Base de Données
connectDB();

// 2. Middlewares Globaux
app.use(cors());
app.use(express.json({ extended: false }));

// 3. Rendre le dossier 'uploads' accessible publiquement (pour écouter la musique)
// Si Awa upload un fichier, l'URL sera http://localhost:5000/uploads/nomfichier.mp3
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Définition des Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tracks', require('./routes/trackRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/playlists', require('./routes/playlistRoutes'));

// 5. Route de base
app.get('/', (req, res) => res.send('API HeriTune en ligne 🎶'));

// 6. Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur HeriTune démarré sur le port ${PORT}`));