const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API(wo)',
      version: '1.0.0',
      description: 'piwodex',
    },
    tags: [
      {
        name: 'Beers',
        description: 'Beer related endpoints',
      },
      {
        name: 'Achievements',
        description: 'Achievement related endpoints',
      },
      {
        name: 'Collected Beers',
        description: 'Collected Beers related endpoints',
      },
      {
        name: 'Users',
        description: 'User related endpoints',
      },
      {
        name: 'Stores',
        description: 'Store related endpoints',
      },
      {
        name: 'User Achievements',
        description: 'User Achievement related endpoints',
      },
      {
        name: 'Discussions',
        description: 'Discussion related endpoints',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./routes/*.js', './docs/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec)
};