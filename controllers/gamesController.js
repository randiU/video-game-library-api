const mongoose = require('mongoose');
const Game = require('../models/game');

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get games',
      error: error.message
    });
  }
};

const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({
        message: 'Invalid game ID format'
      });
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        message: 'Game not found'
      });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get game',
      error: error.message
    });
  }
};

const createGame = async (req, res) => {
  try {
    const newGame = await Game.create(req.body);

    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create game',
      error: error.message
    });
  }
};

const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({
        message: 'Invalid game ID format'
      });
    }

    const updatedGame = await Game.findByIdAndUpdate(gameId, req.body, {
      runValidators: true,
      new: true
    });

    if (!updatedGame) {
      return res.status(404).json({
        message: 'Game not found'
      });
    }

    res.status(200).json(updatedGame);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Game validation failed',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Failed to update game',
      error: error.message
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({
        message: 'Invalid game ID format'
      });
    }

    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      return res.status(404).json({
        message: 'Game not found'
      });
    }

    res.status(200).json({
      message: 'Game deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete game',
      error: error.message
    });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};