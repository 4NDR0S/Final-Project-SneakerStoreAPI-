const mongoose = require('mongoose');
const Order = require('../models/order'); // Importing the Order model

// GET all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            user_id: order.user_id,
            sneaker_id: order.sneaker_id,
            quantity: order.quantity,
            total_price: order.total_price,
            status: order.status
        }));
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other functions remain unchanged...

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
