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

// GET an order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new order
const createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT to update an order by ID
const updateOrder = async (req, res) => {
    try {
        const orderId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE an order by ID
const deleteOrder = async (req, res) => {
    try {
        const orderId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
