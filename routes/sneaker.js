const express = require('express');
const router = express.Router();
const {
    getAllSneakers,
    getSneakerById,
    createSneaker,
    updateSneaker,
    deleteSneaker
} = require('../controllers/sneaker');

// GET all sneakers
router.get('/', getAllSneakers);

// GET a single sneaker by ID
router.get('/:id', getSneakerById);

// POST a new sneaker
router.post('/', createSneaker);

// PUT to update a sneaker by ID
router.put('/:id', updateSneaker);

// DELETE a sneaker by ID
router.delete('/:id', deleteSneaker);

module.exports = router;
