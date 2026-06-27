const mongoose = require("mongoose");
const Genre = require("../models/genre");

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();

    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get genres",
      error: error.message,
    });
  }
};

const getGenreById = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(genreId)) {
      return res.status(400).json({
        message: "Invalid genre ID format",
      });
    }

    const genre = await Genre.findById(genreId);

    if (!genre) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get genre",
      error: error.message,
    });
  }
};

const createGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);

    res.status(201).json(newGenre);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create genre",
      error: error.message,
    });
  }
};

const updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(genreId)) {
      return res.status(400).json({
        message: "Invalid genre ID format",
      });
    }

    const updatedGenre = await Genre.findByIdAndUpdate(genreId, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedGenre) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    res.status(200).json(updatedGenre);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Genre validation failed",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update genre",
      error: error.message,
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(genreId)) {
      return res.status(400).json({
        message: "Invalid genre ID format",
      });
    }

    const deletedGenre = await Genre.findByIdAndDelete(genreId);

    if (!deletedGenre) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    res.status(200).json({
      message: "Genre deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete genre",
      error: error.message,
    });
  }
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
