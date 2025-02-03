const Category = require('../data/database').Category; // Assuming you have a Category model

// GET all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single category by ID
