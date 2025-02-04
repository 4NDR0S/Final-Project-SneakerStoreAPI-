const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   address:
 *                     type: string
 *                     description: The user's address
 *                   phone:
 *                     type: string
 *                     description: The user's phone number
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               address:
 *                 type: string
 *                 description: The user's address
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 */

router.get('/', (req, res) => {
    userController.getAllUsers(req, res);
});

router.get('/:id', (req, res) => {
    userController.getUserById(req, res);
});

router.post('/', (req, res) => {
    userController.createUser(req, res);
});

router.put('/:id', (req, res) => {
    userController.updateUser(req, res);
});

router.delete('/:id', (req, res) => {
    userController.deleteUser(req, res);
});

module.exports = router;
