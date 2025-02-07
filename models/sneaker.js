const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

const Sneaker = mongoose.model('Sneaker', sneakerSchema);

module.exports = Sneaker;
