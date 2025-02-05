const mongoose = require('mongoose');
const Category = require('../models/category'); // Importing the Category model

// GET all categories
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 */
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single category by ID
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
const getCategoryById = async (req, res) => {
    try {
        const categoryId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new category
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid input
 */
const createCategory = async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT to update a category by ID
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
const updateCategory = async (req, res) => {
    try {
        const categoryId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a category by ID
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       204:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
const deleteCategory = async (req, res) => {
    try {
        const categoryId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};