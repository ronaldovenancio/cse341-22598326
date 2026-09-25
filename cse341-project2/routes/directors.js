const express = require('express');
const router = express.Router();

const directorsController = require('../controllers/directors');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get(
  '/',
  /*
    #swagger.tags = ['Directors']
    #swagger.summary = 'Get all directors'
    #swagger.description = 'Returns all directors stored in the database.'

    #swagger.responses[200] = {
      description: 'Directors retrieved successfully.',
      schema: [{
        $ref: '#/definitions/Director'
      }]
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  directorsController.getAll
);

router.get(
  '/:id',
  /*
    #swagger.tags = ['Directors']
    #swagger.summary = 'Get director by ID'
    #swagger.description = 'Returns one director using its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the director.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Director retrieved successfully.',
      schema: {
        $ref: '#/definitions/Director'
      }
    }

    #swagger.responses[400] = {
      description: 'Invalid director ID.'
    }

    #swagger.responses[404] = {
      description: 'Director not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  directorsController.getSingle
);

router.post(
  '/',
  /*
    #swagger.tags = ['Directors']
    #swagger.summary = 'Create a director'
    #swagger.description = 'Creates a new director. Authentication is required.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Director information. All fields are required.',
      required: true,
      schema: {
        $ref: '#/definitions/DirectorInput'
      }
    }

    #swagger.responses[201] = {
      description: 'Director created successfully.',
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
  validation.saveDirector,
  directorsController.createDirector
);

router.put(
  '/:id',
  /*
    #swagger.tags = ['Directors']
    #swagger.summary = 'Update a director'
    #swagger.description = 'Updates an existing director using its MongoDB ID. Authentication is required.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the director.',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated director information. All fields are required.',
      required: true,
      schema: {
        $ref: '#/definitions/DirectorInput'
      }
    }

    #swagger.responses[204] = {
      description: 'Director updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid director data or ID.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[404] = {
      description: 'Director not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  validation.saveDirector,
  directorsController.updateDirector
);

router.delete(
  '/:id',
  /*
    #swagger.tags = ['Directors']
    #swagger.summary = 'Delete a director'
    #swagger.description = 'Deletes an existing director using its MongoDB ID. Authentication is required.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the director.',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Director deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid director ID.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[404] = {
      description: 'Director not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  isAuthenticated,
  directorsController.deleteDirector
);

module.exports = router;