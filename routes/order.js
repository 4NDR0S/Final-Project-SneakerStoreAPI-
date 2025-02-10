const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

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
 */

/**
 * @swagger
 * /api/orders/{id}:
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
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 */

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

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;