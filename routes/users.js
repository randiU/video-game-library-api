const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

// these need login
router.post('/', isAuthenticated, usersController.createUser);
router.put('/:id', isAuthenticated, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;
