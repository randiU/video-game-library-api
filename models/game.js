const mongoose = require('mongoose');

//genre and platforms are strings for simplicity, but we can decide to make them enums or separate collections if needed in the future

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    developer: {
      type: String,
      required: true,
      trim: true
    },
    publisher: {
      type: String,
      required: true,
      trim: true
    },
    releaseYear: {
      type: Number,
      required: true,
      min: 1950
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    platforms: {
      type: [String],
      required: true
    },
    playerCount: {
      type: String,
      required: true,
      trim: true
    },
    multiplayer: {
      type: Boolean,
      required: true
    },
    ageRating: {
      type: String,
      required: true,
      trim: true
    },
    gameStyle: {
      type: String,
      required: true,
      trim: true
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Game', gameSchema);