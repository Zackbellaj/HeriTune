// models/Playlist.js
const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Tableau des collaborateurs (Awa ET Ravi ont les droits)
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
  isPublic: { type: Boolean, default: true }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);