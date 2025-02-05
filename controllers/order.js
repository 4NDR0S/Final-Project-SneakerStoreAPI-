const mongoose = require('mongoose');
const Order = require('../models/order'); // Importing the Order model

// GET all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error); // Log the error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 */
const getOrderById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        console.error("❌ Error fetching order by ID:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Order created
 */
const createOrder = async (req, res) => {
    try {
        const { user_id, sneaker_id, quantity, total_price } = req.body;
        if (!user_id || !sneaker_id || !quantity || !total_price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(400).json({ message: "Error creating order", error: error.message });
    }
};


/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to update
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 */
const updateOrder = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("❌ Error updating order:", error);
        res.status(400).json({ message: "Error updating order", error: error.message });
    }
};


/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to delete
 *     responses:
 *       204:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
const deleteOrder = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

        res.status(204).send();
    } catch (error) {
        console.error("❌ Error deleting order:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
