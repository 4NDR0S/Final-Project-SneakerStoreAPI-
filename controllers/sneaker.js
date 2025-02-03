const Sneaker = require('../data/database').Sneaker; // Importing the Sneaker model

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
        const sneaker = await Sneaker.findById(req.params.id);
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
        const updatedSneaker = await Sneaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const deletedSneaker = await Sneaker.findByIdAndDelete(req.params.id);
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
