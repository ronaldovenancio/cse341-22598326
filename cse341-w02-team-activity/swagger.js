const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Temples API',
    description: 'API documentation for the Temples application'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);