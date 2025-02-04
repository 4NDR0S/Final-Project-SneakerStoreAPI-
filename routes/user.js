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
 */

router.get('/', (req, res) => {
    console.log('getAllUsers called');
    userController.getAllUsers(req, res);
});




router.get('/:id', (req, res) => {
    console.log('getUserById called');
    userController.getUserById(req, res);
});




router.post('/', (req, res) => {
    console.log('createUser called');
    userController.createUser(req, res);
});




router.put('/:id', (req, res) => {
    console.log('updateUser called');
    userController.updateUser(req, res);
});




router.delete('/:id', (req, res) => {
    console.log('deleteUser called');
    userController.deleteUser(req, res);
});





module.exports = router;
