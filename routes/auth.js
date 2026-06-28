const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getAuthStatus, logout } = require('../controllers/authController');

// kick off google login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// google sends the user back here
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/failure', (req, res) => {
  res.status(401).json({
    message: 'Google authentication failed'
  });
});

router.get('/status', getAuthStatus);
router.get('/logout', logout);

module.exports = router;
