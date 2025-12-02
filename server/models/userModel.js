// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String, // "Étudiante en ethnomusicologie..."
  location: String, // "France", "Inde"
  culturalInterests: [String], // Tags: ["Mandingue", "Mantras", "Polyphonies"]
  avatarUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);