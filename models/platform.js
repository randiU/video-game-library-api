const mongoose = require('mongoose');

const allowedPlatforms = [
  'nintendo switch',
  'playstation 5',
  'playstation 4',
  'xbox series x/s',
  'xbox one',
  'pc',
  'mobile',
  'steam deck'
];

const allowedManufacturers = [
  'nintendo',
  'sony',
  'microsoft',
  'valve',
  'apple',
  'google',
  'various'
];

const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      enum: allowedPlatforms
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: allowedManufacturers
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

module.exports = mongoose.model('Platform', platformSchema);