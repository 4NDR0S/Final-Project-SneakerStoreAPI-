const express = require('express');
const router = express.Router();
const {
    getAllSneakers,
    getSneakerById,
    createSneaker,
    updateSneaker,
    deleteSneaker
} = require('../controllers/sneaker');

/**
 * @swagger
 * tags:
 *   name: Sneakers
 *   description: The sneakers managing API
 */

/**
 * @swagger
 * /api/sneakers:
 *   get:
 *     summary: Get all sneakers
 *     tags: [Sneakers]
 *     responses:
 *       200:
 *         description: A list of sneakers
 */

/**
 * @swagger
 * /api/sneakers:
 *   post:
 *     summary: Create a new sneaker
 *     tags: [Sneakers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           ```json
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Salomon X Ultra 4 GTX"
 *               brand:
 *                 type: string
 *                 example: "Salomon"
 *               category_id:
 *                 type: integer
 *                 example: 5
 *               price:
 *                 type: number
 *                 example: 150
 *               stock:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Sneaker created
 */

/**
 * @swagger
 * /api/sneakers/{id}:
 *   get:
 *     summary: Get a sneaker by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the sneaker to retrieve
 *     responses:
 *       200:
 *         description: Sneaker found
 *       404:
 *         description: Sneaker not found
 */

/**
 * @swagger
 * /api/sneakers/{id}:
 *   put:
 *     summary: Update a sneaker by ID
 *     tags: [Sneakers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the sneaker to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Salomon X Ultra 4 GTX"
 *               brand:
 *                 type: string
 *                 example: "Salomon"
 *               category_id:
 *                 type: integer
 *                 example: 5
 *               price:
 *                 type: number
 *                 example: 150
 *               stock:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Sneaker updated
 *       404:
 *         description: Sneaker not found
 */

/**
 * @swagger
 * /api/sneakers/{id}:
 *   delete:
 *     summary: Delete a sneaker by ID
 *     tags: [Sneakers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the sneaker to delete
 *     responses:
 *       204:
 *         description: Sneaker deleted
 *       404:
 *         description: Sneaker not found
 */

router.get('/', getAllSneakers);
router.get('/:id', getSneakerById);
router.post('/', createSneaker);
router.put('/:id', updateSneaker);
router.delete('/:id', deleteSneaker);

module.exports = router;