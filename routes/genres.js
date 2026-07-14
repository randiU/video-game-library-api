const express = require('express');
const router = express.Router();

const genresController = require('../controllers/genresController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', genresController.getAllGenres);
router.get('/:id', genresController.getGenreById);

// these need login
router.post('/', isAuthenticated, genresController.createGenre);
router.put('/:id', isAuthenticated, genresController.updateGenre);
router.delete('/:id', isAuthenticated, genresController.deleteGenre);

module.exports = router;