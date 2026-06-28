// check if the user is logged in
const getAuthStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: req.user
    });
  }

  return res.status(200).json({
    authenticated: false
  });
};

// log out and clear the session
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        return next(destroyErr);
      }

      res.clearCookie('connect.sid');
      res.status(200).json({
        message: 'Logged out successfully'
      });
    });
  });
};

module.exports = {
  getAuthStatus,
  logout
};
