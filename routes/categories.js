const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');

// GET all categories
router.get('/', getAllCategories);

// GET a single category by ID
router.get('/:id', getCategoryById);

// POST a new category
router.post('/', createCategory);

// PUT to update a category by ID
router.put('/:id', updateCategory);

// DELETE a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
