const Order = require('../data/database').Order; // Importing the Order model


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
const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get an order by ID
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
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

    const order = new Order(req.body);
    try {
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
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
