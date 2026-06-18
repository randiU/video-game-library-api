const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/gamesController');

//Todo: add validation and error handling in the controller methods
router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);
router.post('/', gamesController.createGame);
router.put('/:id', gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame);

module.exports = router;