const express = require('express');
const router = express.Router();
const {
    getAllSneakers,
    getSneakerById,
    createSneaker,
    updateSneaker,
    deleteSneaker
} = require('../controllers/sneaker');
const { isAuthenticated }  = require('../middleware/authenticate');

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
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               category_id:
 *                 type: string
 *               price:
 *                 type: string
 *               stock:
 *                 type: string 
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
 *               brand:
 *                 type: string
 *               category_id:
 *                 type: string
 *               price:
 *                 type: string
 *               stock:
 *                 type: string 
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

// Corrected routes
//router.get('/', getAllSneakers);
router.get('/', getAllSneakers);
router.get('/:id', getSneakerById); // Removed '/sneakers' prefix
router.post('/', isAuthenticated, createSneaker);
router.put('/:id', isAuthenticated, updateSneaker); // Removed '/sneakers' prefix
router.delete('/:id', isAuthenticated, deleteSneaker); // Removed '/sneakers' prefix

module.exports = router;