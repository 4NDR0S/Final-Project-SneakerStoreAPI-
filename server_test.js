// Importamos las variables de entorno
require('dotenv').config(); 

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
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize()) // init session in every route
    .use(passport.session()) // allow passport to use "express-session"
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger UI

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/sneakers', sneakersRoutes);
app.use('/api/users', usersRoutes);

// Handle 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Passport configuration
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

app.get('/login', passport.authenticate('github', (req, res) => { }));

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// this is for unit test

if (process.env.NODE_ENV === 'test') { // Solo iniciar el servidor en modo test
    mongodb.initDb((err) => {
        if (err) {
            console.error("❌ MongoDB connection failed:", err);
            process.exit(1); // Exit process if DB connection fails
        } else {
            app.listen(port, () => {
                console.log(`✅ Test server is running on http://localhost:${port}`);
            });
        }
    });
}

// EXPORTAMOS LA INSTANCIA DE `app` PARA LAS PRUEBAS
module.exports = app;
