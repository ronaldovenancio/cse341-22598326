const swaggerAutogen = require('swagger-autogen')();

const isRender = process.env.RENDER === 'true';

const doc = {
  info: {
    title: 'Movies API',
    description: 'REST API for managing movies and directors.'
  },

  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:8080',

  schemes: isRender ? ['https'] : ['http'],

  definitions: {
    Movie: {
      _id: '64f1a2b3c4d5e6f789012345',
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Science Fiction',
      releaseYear: 2010,
      rating: 8.8,
      duration: 148,
      language: 'English'
    },

    MovieInput: {
      $title: 'Inception',
      $director: 'Christopher Nolan',
      $genre: 'Science Fiction',
      $releaseYear: 2010,
      $rating: 8.8,
      $duration: 148,
      $language: 'English'
    },

    Director: {
      _id: '64f1a2b3c4d5e6f789012345',
      firstName: 'Christopher',
      lastName: 'Nolan',
      birthYear: 1970,
      nationality: 'British-American'
    },

    DirectorInput: {
      $firstName: 'Christopher',
      $lastName: 'Nolan',
      $birthYear: 1970,
      $nationality: 'British-American'
    },

    CreateResponse: {
      id: '64f1a2b3c4d5e6f789012345'
    },

    ErrorResponse: {
      message: 'Resource not found.'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);