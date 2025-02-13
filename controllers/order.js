const mongoose = require('mongoose');
const Order = require('../models/order'); // Importing the Order model

// GET all orders
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error); // Log the error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET a single order by ID
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
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

// POST a new order
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 3
 *               sneaker_id:
 *                 type: integer
 *                 example: 5
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               total_price:
 *                 type: number
 *                 example: 210
 *               status:
 *                 type: string
 *                 example: "Processing"
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Missing required fields
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

// PUT to update an order by ID
/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               sneaker_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               status:
 *                 type: string
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
        if (!updatedOrder) return res.status(404). json({ message: 'Order not found' });

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("❌ Error updating order:", error);
        res.status(400).json({ message: "Error updating order", error: error.message });
    }
};

// DELETE an order by ID
/**
 * @swagger
 * /api/orders/{id}:
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
