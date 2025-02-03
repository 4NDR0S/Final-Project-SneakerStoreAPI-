const Sneaker = require('../data/database').Sneaker; // Assuming you have a Sneaker model

// GET all sneakers
const getAllSneakers = async (req, res) => {
    try {
        const sneakers = await Sneaker.find();
        res.status(200).json(sneakers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single sneaker by ID
const getSneakerById = async (req, res) => {
    try {
        const sneaker = await Sneaker.findById(req.params.id);
        if (!sneaker) return res.status(404).json({ message: 'Sneaker not found' });
        res.status(200).json(sneaker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new sneaker
const createSneaker = async (req, res) => {
    const sneaker = new Sneaker(req.body);
    try {
        const savedSneaker = await sneaker.save();
        res.status(201).json(savedSneaker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT to update a sneaker by ID
const updateSneaker = async (req, res) => {
    try {
        const updatedSneaker = await Sneaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSneaker) return res.status(404).json({ message: 'Sneaker not found' });
        res.status(200).json(updatedSneaker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a sneaker by ID
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
