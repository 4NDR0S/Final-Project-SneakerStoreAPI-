const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const categoriesRoutes = require('./routes/categories');
const ordersRoutes = require('./routes/order');
const sneakersRoutes = require('./routes/sneaker');
const usersRoutes = require('./routes/user');
const categoriesController = require('./controllers/categories');
const ordersController = require('./controllers/orders');
const sneakersController = require('./controllers/sneakers');
const usersController = require('./controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger setup
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
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/order', ordersRoutes);
app.use('/api/sneaker', sneakersRoutes);
app.use('/api/user', usersRoutes);

// Controllers
app.use('/api/categories', categoriesController);
app.use('/api/order', ordersController);
app.use('/api/sneaker', sneakersController);
app.use('/api/user', usersController);

// Connect to MongoDB and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
});
