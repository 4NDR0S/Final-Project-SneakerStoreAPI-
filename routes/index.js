const express = require('express');
const router = express.Router();

const categoriesRoutes = require('./categories');
const ordersRoutes = require('./order');
const sneakersRoutes = require('./sneaker');
const usersRoutes = require('./user');

// Use the imported routes
router.use('/categories', categoriesRoutes);
router.use('/orders', ordersRoutes);
router.use('/sneakers', sneakersRoutes);
router.use('/users', usersRoutes);

module.exports = router;
