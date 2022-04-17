const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    ORDER_ID: {
        type: String,
        required: true
    },
    ORDER_DATE: {
        type: String,
        required: true
    },
    TOTAL: {
        type: Number,
        required: true
    },
    ORDER_ITEMS: [{
        ORDER_ITEMs: { type: mongoose.Schema.ObjectId, ref: 'Item' },
        BUY_PRICE : Number,
        QUANTITY : Number
    }]
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;