const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/gamesController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);

// these need login
router.post('/', isAuthenticated, gamesController.createGame);
router.put('/:id', isAuthenticated, gamesController.updateGame);
router.delete('/:id', isAuthenticated, gamesController.deleteGame);

module.exports = router;