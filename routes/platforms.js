const express = require('express');
const router = express.Router();

const platformsController = require('../controllers/platformsController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', platformsController.getAllPlatforms);
router.get('/:id', platformsController.getPlatformById);

// these need login
router.post('/', isAuthenticated, platformsController.createPlatform);
router.put('/:id', isAuthenticated, platformsController.updatePlatform);
router.delete('/:id', isAuthenticated, platformsController.deletePlatform);

module.exports = router;