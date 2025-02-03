require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./data/database');
const categoriesRoutes = require('./routes/categories');
const ordersRoutes = require('./routes/order');
const sneakersRoutes = require('./routes/sneaker');
const usersRoutes = require('./routes/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger'); // Swagger documentation

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger UI

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/order', ordersRoutes);
app.use('/api/sneaker', sneakersRoutes);
app.use('/api/user', usersRoutes);

// Handle 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Connect to MongoDB and start the server
mongodb.initDb((err) => {
    if (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1); // Exit process if DB connection fails
    } else {
        app.listen(port, () => {
            console.log(`✅ Server is running on http://localhost:${port}`);
        });
    }
});
