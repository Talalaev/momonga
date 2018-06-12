const swaggerJSDoc = require('swagger-jsdoc');
const config = require('config');

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc({
    // import swaggerDefinitions
    swaggerDefinition: {
        info: {
            title: 'Momonga API',
            version: '0.2.2',
            description: 'Демонстрирует как использовать RESTful API',
        },
        host: 'localhost:3000',
        basePath: config.apiBasePath,
    },
    // path to the API docs
    apis: ['./server/routes/*.js', './server/models/*.js'],
});

module.exports = swaggerSpec;