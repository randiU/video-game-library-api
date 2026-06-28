const express = require('express');
const router = express.Router();

const platformsController = require('../controllers/platformsController');

router.get('/', platformsController.getAllPlatforms);
router.get('/:id', platformsController.getPlatformById);
router.post('/', platformsController.createPlatform);
router.put('/:id', platformsController.updatePlatform);
router.delete('/:id', platformsController.deletePlatform);

module.exports = router;