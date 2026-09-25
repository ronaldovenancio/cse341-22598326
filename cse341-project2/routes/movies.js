const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get(
  '/',
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Get all movies'
    #swagger.description = 'Returns all movies stored in the database.'

    #swagger.responses[200] = {
      description: 'Movies retrieved successfully.',
      schema: [{
        $ref: '#/definitions/Movie'
      }]
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  moviesController.getAll
);

router.get(
  '/:id',
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Get movie by ID'
    #swagger.description = 'Returns one movie using its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the movie.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Movie retrieved successfully.',
      schema: {
        $ref: '#/definitions/Movie'
      }
    }

    #swagger.responses[400] = {
      description: 'Invalid movie ID.'
    }

    #swagger.responses[404] = {
      description: 'Movie not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  moviesController.getSingle
);

router.post(
  '/',
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Create a movie'
    #swagger.description = 'Creates a new movie.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Movie information. All fields are required.',
      required: true,
      schema: {
        $ref: '#/definitions/MovieInput'
      }
    }

    #swagger.responses[201] = {
      description: 'Movie created successfully.',
      schema: {
        $ref: '#/definitions/CreateResponse'
      }
    }

    #swagger.responses[400] = {
      description: 'Validation failed.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  validation.saveMovie,
  moviesController.createMovie
);

router.put(
  '/:id',
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Update a movie'
    #swagger.description = 'Updates an existing movie using its MongoDB ID. Authentication is required.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the movie.',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated movie information. All fields are required.',
      required: true,
      schema: {
        $ref: '#/definitions/MovieInput'
      }
    }

    #swagger.responses[204] = {
      description: 'Movie updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid movie data or ID.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[404] = {
      description: 'Movie not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  validation.saveMovie,
  moviesController.updateMovie
);

router.delete(
  '/:id',
  /*
    #swagger.tags = ['Movies']
    #swagger.summary = 'Delete a movie'
    #swagger.description = 'Deletes an existing movie using its MongoDB ID. Authentication is required.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the movie.',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Movie deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid movie ID.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[404] = {
      description: 'Movie not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  moviesController.deleteMovie
);

module.exports = router;