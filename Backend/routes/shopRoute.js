var express = require('express');
const shop = express();

var shopController = require("../controllers/shopController");

const passport = require('passport');

shop.post('/check-shop-name', passport.authenticate('jwt', { session: false }), shopController.shop_check_name);

shop.post('/add-new-shop', passport.authenticate('jwt', { session: false }), shopController.shop_add_new);

shop.get('/details',  shopController.shop_details);

shop.post('/add-photo',  shopController.shop_add_photo);

// users.post('/login', userController.user_login_post);

// users.put('/edit-profile', passport.authenticate('jwt', { session: false }), userController.user_edit_profile_put);

// users.get('/protected', passport.authenticate('jwt', { session: false }) , (req,res) => {
    
//     res.json({message: "inside protected", user:req.user})
// })
module.exports = shop;