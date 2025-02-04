const User = require('../models/user'); // Importing the User model
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// GET all users
const getAllUsers = async (req, res) => {
    console.log('getAllUsers called'); // Log when the function is called
    try {
        const users = await User.find();
        const usersWithId = users.map(user => ({
            _id: user._id, // Include the _id field
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone
        }));
        res.status(200).json(usersWithId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
const getUserById = async (req, res) => {
    console.log('getUserById called'); // Log when the function is called
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User created
 */
const createUser = async (req, res) => {
    console.log('createUser called'); // Log when the function is called
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
const updateUser = async (req, res) => {
    console.log('updateUser called'); // Log when the function is called
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
const deleteUser = async (req, res) => {
    console.log('deleteUser called'); // Log when the function is called
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
