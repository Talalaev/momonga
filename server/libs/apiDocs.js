const swaggerJSDoc = require('swagger-jsdoc');

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc({
    // import swaggerDefinitions
    swaggerDefinition: {
        info: {
            title: 'Momonga API',
            version: '0.1.0',
            description: 'Демонстрирует как использовать RESTful API',
        },
        host: 'localhost:3000',
        basePath: '/',
    },
    // path to the API docs
    apis: ['./server/routes/*.js', './server/models/*.js'],
});

module.exports = swaggerSpec;