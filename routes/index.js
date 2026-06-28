const express = require('express');
const router = express.Router();

const { getHome } = require('../controllers/homeController');

router.get('/', getHome);

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/games', require('./games'));
router.use('/genres', require('./genres'));
router.use('/platforms', require('./platforms'));
router.use('/api-docs', require('./swagger'));

module.exports = router;