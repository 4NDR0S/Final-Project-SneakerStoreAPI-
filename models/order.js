const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    sneaker_id: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
