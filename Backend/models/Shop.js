const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    SHOP_NAME: {
        type: String,
        required: true,
        unique: true
    },
    SHOP_IMAGE: {
        type: String,
        required: true
    },
    SHOP_ITEMS: [
        { type: mongoose.Schema.ObjectId, ref: 'Item' }
    ]
})

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;