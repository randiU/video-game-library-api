const express = require('express');
const router = express.Router();

const userLibraryController = require('../controllers/userLibraryController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', userLibraryController.getAllLibraryEntries);
router.get('/:id', userLibraryController.getLibraryEntryById);

router.post(
  '/',
  isAuthenticated,
  userLibraryController.createLibraryEntry
);

router.put(
  '/:id',
  isAuthenticated,
  userLibraryController.updateLibraryEntry
);

router.delete(
  '/:id',
  isAuthenticated,
  userLibraryController.deleteLibraryEntry
);

module.exports = router;