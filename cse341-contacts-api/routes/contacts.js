const express = require('express');
const contactsController = require('../controllers/contacts');

const router = express.Router();

router.get(
  '/',
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Returns all contacts stored in MongoDB.'

    #swagger.responses[200] = {
      description: 'Contacts retrieved successfully.',
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/Contact'
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  contactsController.getAll
);

router.get(
  '/:id',
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get a contact by ID'
    #swagger.description = 'Returns one contact using its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the contact.',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Contact retrieved successfully.',
      schema: {
        $ref: '#/definitions/Contact'
      }
    }

    #swagger.responses[400] = {
      description: 'Invalid contact ID.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  contactsController.getSingle
);

router.post(
  '/',
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Creates a new contact. All contact fields are required.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact information.',
      required: true,
      schema: {
        $ref: '#/definitions/Contact'
      }
    }

    #swagger.responses[201] = {
      description: 'Contact created successfully.',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '68c000000000000000000001'
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: 'One or more required fields are missing.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  contactsController.createContact
);

router.put(
  '/:id',
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact'
    #swagger.description = 'Updates an existing contact using its MongoDB ID. The ID itself is not modified.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the contact.',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact information. All contact fields are required.',
      required: true,
      schema: {
        $ref: '#/definitions/Contact'
      }
    }

    #swagger.responses[204] = {
      description: 'Contact updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid contact ID or missing required fields.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  contactsController.updateContact
);

router.delete(
  '/:id',
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact'
    #swagger.description = 'Deletes an existing contact using its MongoDB ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ID of the contact.',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Contact deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid contact ID.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error.'
    }
  */
  contactsController.deleteContact
);

module.exports = router;