const mongoose = require('mongoose');
const UserLibrary = require('../models/userLibrary');

const getAllLibraryEntries = async (req, res) => {
  try {
    const library = await UserLibrary.find()
      .populate('userId', 'displayName email')
      .populate('gameId', 'title');

    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get library entries',
      error: error.message
    });
  }
};

const getLibraryEntryById = async (req, res) => {
  try {
    const libraryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(libraryId)) {
      return res.status(400).json({
        message: 'Invalid library ID format'
      });
    }

    const libraryEntry = await UserLibrary.findById(libraryId)
      .populate('userId', 'displayName email')
      .populate('gameId', 'title');

    if (!libraryEntry) {
      return res.status(404).json({
        message: 'Library entry not found'
      });
    }

    res.status(200).json(libraryEntry);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get library entry',
      error: error.message
    });
  }
};

const createLibraryEntry = async (req, res) => {
  try {
    const newEntry = await UserLibrary.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create library entry',
      error: error.message
    });
  }
};

const updateLibraryEntry = async (req, res) => {
  try {
    const libraryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(libraryId)) {
      return res.status(400).json({
        message: 'Invalid library ID format'
      });
    }

    const updatedEntry = await UserLibrary.findByIdAndUpdate(
      libraryId,
      req.body,
      {
        runValidators: true,
        new: true
      }
    );

    if (!updatedEntry) {
      return res.status(404).json({
        message: 'Library entry not found'
      });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Library validation failed',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Failed to update library entry',
      error: error.message
    });
  }
};

const deleteLibraryEntry = async (req, res) => {
  try {
    const libraryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(libraryId)) {
      return res.status(400).json({
        message: 'Invalid library ID format'
      });
    }

    const deletedEntry = await UserLibrary.findByIdAndDelete(libraryId);

    if (!deletedEntry) {
      return res.status(404).json({
        message: 'Library entry not found'
      });
    }

    res.status(200).json({
      message: 'Library entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete library entry',
      error: error.message
    });
  }
};

module.exports = {
  getAllLibraryEntries,
  getLibraryEntryById,
  createLibraryEntry,
  updateLibraryEntry,
  deleteLibraryEntry
};