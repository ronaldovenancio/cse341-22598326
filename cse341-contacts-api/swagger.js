const swaggerAutogen = require('swagger-autogen')();

const isRender = process.env.RENDER === 'true';

const doc = {
  info: {
    title: 'Contacts API',
    description:
      'API for creating, retrieving, updating, and deleting contacts stored in MongoDB.',
    version: '1.0.0'
  },

  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:8080',

  schemes: isRender ? ['https'] : ['http'],

  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints for managing contacts'
    }
  ],

  definitions: {
    Contact: {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'email',
        'favoriteColor',
        'birthday'
      ],
      properties: {
        _id: {
          type: 'string',
          description: 'MongoDB generated contact ID',
          readOnly: true,
          example: '68c000000000000000000001'
        },
        firstName: {
          type: 'string',
          example: 'William'
        },
        lastName: {
          type: 'string',
          example: 'Cabral'
        },
        email: {
          type: 'string',
          example: 'william@example.com'
        },
        favoriteColor: {
          type: 'string',
          example: 'Blue'
        },
        birthday: {
          type: 'string',
          example: '1995-05-15'
        }
      }
    }
  }
};

const outputFile = './swagger.json';

const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);