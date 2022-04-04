const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    EMAIL: {
        type: String,
        required: true,
        unique: true
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
    COUNTRY: {
        type: String
    },
    ABOUT: {
        type: String
    },
    PROFILE_IMAGE: {
        type: String
    },
    
    SHOP:{
        type: mongoose.Schema.ObjectId, ref: 'Shop' 
    }
    ,
    ORDER_HISTORY: [
        { type: mongoose.Schema.ObjectId, ref: 'Order' }
    ],
    FAVOURITES: [
        { type: mongoose.Schema.ObjectId, ref: 'Item' }
    ]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;