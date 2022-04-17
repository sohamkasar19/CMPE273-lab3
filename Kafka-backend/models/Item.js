const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    ITEM_NAME: {
        type: String,
        required: true
    },
    SHOP: { 
        type: mongoose.Schema.ObjectId, ref: 'Shop' 
    },
    CATEGORY: {
        type: String,
        required: true
    },
    ITEM_IMAGE: {
        type: String
    },
    PRICE: {
        type: Number,
        required: true
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