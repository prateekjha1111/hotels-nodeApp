const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['starter', 'main course', 'dessert', 'beverage'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
