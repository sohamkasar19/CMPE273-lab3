const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    SHOP_NAME: {
        type: String,
        required: true,
        unique: true
    },
    SHOP_IMAGE: {
        type: String,
    },
    SHOP_ITEMS: [
        { type: mongoose.Schema.ObjectId, ref: 'Item' }
    ],
    OWNER: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
})

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;