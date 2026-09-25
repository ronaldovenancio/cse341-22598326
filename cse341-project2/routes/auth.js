const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const { isAuthenticated } = require('../middleware/auth');

// Start GitHub OAuth login
router.get(
  '/github',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login with GitHub'
    #swagger.description = 'Starts the GitHub OAuth authorization flow.'

    #swagger.responses[302] = {
      description: 'Redirects the user to GitHub.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

// GitHub OAuth callback
router.get(
  '/github/callback',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'GitHub OAuth callback'
    #swagger.description = 'Handles the GitHub OAuth callback and establishes the authenticated application session.'

    #swagger.responses[302] = {
      description: 'Authentication succeeded and the user is redirected to the API documentation.'
    }

    #swagger.responses[401] = {
      description: 'GitHub authentication failed.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  passport.authenticate('github', {
    failureRedirect: '/auth/failure'
  }),
  (req, res) => {
    try {
      return res.redirect('/api-docs');
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.'
      });
    }
  }
);

// Check authentication status
router.get(
  '/status',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Check authentication status'
    #swagger.description = 'Returns whether the current user has an authenticated session.'

    #swagger.responses[200] = {
      description: 'Authentication status returned successfully.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  (req, res) => {
    try {
      const authenticated =
        req.isAuthenticated && req.isAuthenticated();

      return res.status(200).json({
        authenticated,
        user: authenticated
          ? {
              id: req.user._id,
              username: req.user.username,
              displayName: req.user.displayName,
              email: req.user.email
            }
          : null
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.'
      });
    }
  }
);

// View protected user information
router.get(
  '/profile',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Get authenticated user profile'
    #swagger.description = 'Protected route. Returns the current authenticated user profile.'

    #swagger.responses[200] = {
      description: 'Authenticated user profile returned successfully.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  (req, res) => {
    try {
      return res.status(200).json({
        id: req.user._id,
        username: req.user.username,
        displayName: req.user.displayName,
        email: req.user.email,
        provider: req.user.provider
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.'
      });
    }
  }
);

// OAuth failure
router.get(
  '/failure',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'GitHub authentication failure'
    #swagger.description = 'Returns an error when GitHub authentication is unsuccessful.'

    #swagger.responses[401] = {
      description: 'GitHub authentication failed.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  (req, res) => {
    try {
      return res.status(401).json({
        message: 'GitHub authentication failed.'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.'
      });
    }
  }
);

// Logout
router.get(
  '/logout',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Log out'
    #swagger.description = 'Protected route. Ends the authenticated user session.'

    #swagger.responses[200] = {
      description: 'Logged out successfully.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  (req, res, next) => {
    try {
      req.logout((logoutError) => {
        if (logoutError) {
          return next(logoutError);
        }

        req.session.destroy((sessionError) => {
          if (sessionError) {
            return next(sessionError);
          }

          res.clearCookie('connect.sid');

          return res.status(200).json({
            message: 'Logged out successfully.'
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.'
      });
    }
  }
);

module.exports = router;