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

// router.get('/login', passport.authenticate('github', (req, res) => {}));

// router.get('/logout', function(req, res, next) {

//     req.logout(function(err){
//         if(err) { return next(err); }
//         res.redirect('/');
//     });

// });

module.exports = router;
