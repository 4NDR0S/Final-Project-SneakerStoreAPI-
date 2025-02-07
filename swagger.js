const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sneaker Store API',
            version: '1.0.0',
            description: 'API documentation for the Sneaker Store project',
        },
        servers: [
            {
                url: 'https://final-project-sneakerstoreapi.onrender.com',
            },
        ],
    },
    apis: ['./routes/*.js'] // Path to the API documentation files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
