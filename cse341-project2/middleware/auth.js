const isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    return res.status(401).json({
      message: 'Authentication required.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  isAuthenticated
};