const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order');

// GET all orders
router.get('/', getAllOrders);

// GET a single order by ID
router.get('/:id', getOrderById);

// POST a new order
router.post('/', createOrder);

// PUT to update an order by ID
router.put('/:id', updateOrder);

// DELETE an order by ID
router.delete('/:id', deleteOrder);

module.exports = router;
