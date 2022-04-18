const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    ORDER_DATE: {
        type: String,
        required: true
    },
    TOTAL: {
        type: Number,
        required: true
    },
    ORDER_ITEMS: [{
        ORDER_ITEM: { type: mongoose.Schema.ObjectId, ref: 'Item' },
        BUY_PRICE : Number,
        QUANTITY : Number,
        GIFT_WRAP : Boolean,
        MESSAGE: String
    }]
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;