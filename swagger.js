const swaggerJsDoc = require('swagger-jsdoc'); // Importing swagger-jsdoc for API documentation
const swaggerUi = require('swagger-ui-express'); // Importing swagger-ui-express for serving the documentation


const swaggerOptions = { // Swagger options configuration

    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sneaker Store API',
            version: '1.0.0',
            description: 'API documentation for the Sneaker Store project',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API documentation files

};

const swaggerDocs = swaggerJsDoc(swaggerOptions); // Generating Swagger documentation


module.exports = swaggerDocs; // Exporting the Swagger documentation
