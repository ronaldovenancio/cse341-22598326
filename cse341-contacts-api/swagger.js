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
    _id: '64f1a2b3c4d5e6f789012345',
    firstName: 'William',
    lastName: 'Cabral',
    email: 'william@example.com',
    favoriteColor: 'Blue',
    birthday: '1995-05-15'
  },

  ContactInput: {
    $firstName: 'William',
    $lastName: 'Cabral',
    $email: 'william@example.com',
    $favoriteColor: 'Blue',
    $birthday: '1995-05-15'
  },

  CreateContactResponse: {
    id: '64f1a2b3c4d5e6f789012345'
  }
}
};

const outputFile = './swagger.json';

const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);