const mongoose = require('mongoose');

const allowedGenres = [
  'action',
  'adventure',
  'action-adventure',
  'rpg',
  'strategy',
  'simulation',
  'sports',
  'racing',
  'puzzle',
  'platformer',
  'shooter',
  'fighting',
  'horror',
  'sandbox',
  'party',
  'educational'
];

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      enum: allowedGenres
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Genre', genreSchema);