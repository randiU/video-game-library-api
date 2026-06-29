const mongoose = require('mongoose');

const userLibrarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    status: {
      type: String,
      required: true,
      trim: true
    },
    favorite: {
      type: Boolean,
      default: false
    },
    personalRating: {
      type: Number,
      min: 1,
      max: 5
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    hoursPlayed: {
      type: Number,
      default: 0,
      min: 0
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UserLibrary', userLibrarySchema);