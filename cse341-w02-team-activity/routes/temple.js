const routes = require('express').Router();

const temples = require('../controllers/temple.js');

routes.get(
  '/',
  /*
    #swagger.tags = ['Temples']
    #swagger.summary = 'Get all temples'
    #swagger.description = 'Returns all temples. A valid API key must be provided in the apiKey request header.'

    #swagger.parameters['apiKey'] = {
      in: 'header',
      description: 'API key required to access the temple data.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Temples retrieved successfully.',
      schema: [{
        temple_id: 1,
        name: 'Aba Nigeria Temple',
        location: 'Aba, Nigeria',
        dedicated: 'August 7, 2005',
        additionalInfo: false
      }]
    }

    #swagger.responses[500] = {
      description: 'Server error while retrieving temples.'
    }
  */
  temples.findAll
);

routes.get(
  '/:temple_id',
  /*
    #swagger.tags = ['Temples']
    #swagger.summary = 'Get one temple'
    #swagger.description = 'Returns one temple using its temple_id.'

    #swagger.parameters['temple_id'] = {
      in: 'path',
      description: 'Numeric ID of the temple.',
      required: true,
      type: 'integer'
    }

    #swagger.parameters['apiKey'] = {
      in: 'header',
      description: 'API key required to access the temple data.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Temple retrieved successfully.',
      schema: {
        temple_id: 1,
        name: 'Aba Nigeria Temple',
        location: 'Aba, Nigeria',
        dedicated: 'August 7, 2005',
        additionalInfo: false
      }
    }

    #swagger.responses[404] = {
      description: 'Temple not found.'
    }

    #swagger.responses[500] = {
      description: 'Server error while retrieving the temple.'
    }
  */
  temples.findOne
);

routes.post(
  '/',
  /*
    #swagger.tags = ['Temples']
    #swagger.summary = 'Create a new temple'
    #swagger.description = 'Creates a new temple in the MongoDB temples collection.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Temple information.',
      required: true,
      schema: {
        $temple_id: 999,
        $name: 'Example Temple',
        $location: 'Example City',
        $dedicated: 'September 8, 2026',
        $additionalInfo: false
      }
    }

    #swagger.responses[200] = {
      description: 'Temple created successfully.'
    }

    #swagger.responses[400] = {
      description: 'The temple name was not provided.',
      schema: {
        message: 'Content can not be empty!'
      }
    }

    #swagger.responses[500] = {
      description: 'Server error while creating the temple.'
    }
  */
  temples.create
);

routes.put(
  '/:id',
  /*
    #swagger.tags = ['Temples']
    #swagger.summary = 'Update a temple'
    #swagger.description = 'Updates an existing temple using its MongoDB document ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the temple to update.',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Temple information to update.',
      required: true,
      schema: {
        temple_id: 9999,
        name: 'Updated Temple',
        location: 'Updated City',
        dedicated: 'September 10, 2026',
        additionalInfo: false
      }
    }

    #swagger.responses[200] = {
      description: 'Temple updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'No update data was provided.'
    }

    #swagger.responses[404] = {
      description: 'Temple was not found.'
    }

    #swagger.responses[500] = {
      description: 'Error updating the temple.'
    }
  */
  temples.update
);

routes.delete(
  '/:id',
  /*
    #swagger.tags = ['Temples']
    #swagger.summary = 'Delete a temple'
    #swagger.description = 'Deletes an existing temple using its MongoDB document ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the temple to delete.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Temple deleted successfully.'
    }

    #swagger.responses[404] = {
      description: 'Temple was not found.'
    }

    #swagger.responses[500] = {
      description: 'Error deleting the temple.'
    }
  */
  temples.delete
);

module.exports = routes;