const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    ITEM_NAME: {
        type: String,
        required: true
    },
    SHOP_NAME: {
        type: String,
        required: true
    },
    CATEGORY: {
        type: String,
        required: true
    },
    ITEM_IMAGE: {
        type: String
    },
    QUANTITY_AVAILABLE: {
        type: Number,
        required: true
    },
    QUANTITY_SOLD: {
        type: Number,
        required: true
    },
    DESCRIPTION: {
        type: String
    }
})

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;