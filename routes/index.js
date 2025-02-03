const express = require('express');
const router = express.Router();

const categoriesRoutes = require('./categories');
const ordersRoutes = require('./order');
const sneakersRoutes = require('./sneaker');
const usersRoutes = require('./user');

// Use the imported routes
router.use('/categories', categoriesRoutes);
router.use('/order', ordersRoutes);
router.use('/sneaker', sneakersRoutes);
router.use('/user', usersRoutes);

module.exports = router;
