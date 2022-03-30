const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    EMAIL: {
        type: String,
        required: true
    },
    NAME: {
        type: String,
        required: true
    },
    PASSWORD: {
        type: String,
        required: true
    },
    DOB: {
        type: String
    },
    PHONE_NO: {
        type: String
    },
    GENDER: {
        type: String
    },
    CITY: {
        type: String
    },
    ADDRESS: {
        type: String
    },
    ABOUT: {
        type: String
    },
    PROFILE_IMAGE: {
        type: String
    },
    
    SHOP:
        {
            SHOP_NAME: String,
            SHOP_IMAGE: String,
            SHOP_ITEMS: [
                { type: mongoose.Schema.ObjectId, ref: 'Item' }
            ]
        }
    ,
    ORDERS: [
        {
            ORDER_ID: String,
            ORDER_DATE: Date,
            TOTAL: Number,
            ORDER_ITEMS: [{
                ORDER_ITEMs: { type: mongoose.Schema.ObjectId, ref: 'Item' },
                PRICE : Number,
                Quantity : Number
            }]
        }
    ],
    FAVOURITES: [
        { type: mongoose.Schema.ObjectId, ref: 'Item' }
    ]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;