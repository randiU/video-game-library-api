const express = require('express');
const router = express.Router();

const { getHome } = require('../controllers/homeController');

router.get('/', getHome);

router.use('/games', require('./games'));
router.use('/api-docs', require('./swagger'));

module.exports = router;