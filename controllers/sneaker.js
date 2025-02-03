const mongoose = require('mongoose');
const Sneaker = require('../models/sneaker'); // Importing the Sneaker model

// GET all sneakers
const getAllSneakers = async (req, res) => {
    try {
        const sneakers = await Sneaker.find();
        res.status(200).json(sneakers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
const getSneakerById = async (req, res) => {
    try {
        const sneakerId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const sneaker = await Sneaker.findById(sneakerId);
        if (!sneaker) return res.status(404).json({ message: 'Sneaker not found' });
        res.status(200).json(sneaker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @swagger
 * /api/sneakers:
 *   post:
 *     summary: Create a new sneaker
 *     tags: [Sneakers]
 *     responses:
 *       201:
 *         description: Sneaker created
 */
const createSneaker = async (req, res) => {
    const sneaker = new Sneaker(req.body);
    try {
        const savedSneaker = await sneaker.save();
        res.status(201).json(savedSneaker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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
 *     responses:
 *       200:
 *         description: Sneaker updated
 *       404:
 *         description: Sneaker not found
 */
const updateSneaker = async (req, res) => {
    try {
        const sneakerId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const updatedSneaker = await Sneaker.findByIdAndUpdate(sneakerId, req.body, { new: true });
        if (!updatedSneaker) return res.status(404).json({ message: 'Sneaker not found' });
        res.status(200).json(updatedSneaker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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
const deleteSneaker = async (req, res) => {
    try {
        const sneakerId = mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const deletedSneaker = await Sneaker.findByIdAndDelete(sneakerId);
        if (!deletedSneaker) return res.status(404).json({ message: 'Sneaker not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSneakers,
    getSneakerById,
    createSneaker,
    updateSneaker,
    deleteSneaker
};
