const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Le champ clé qui posait problème
  audioUrl: { type: String, required: true }, 
  coverImage: String,
  
  origin: { type: String, required: true }, 
  tradition: { type: String },
  ritualContext: { type: String },
  therapeuticFunction: { type: String },
  
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);