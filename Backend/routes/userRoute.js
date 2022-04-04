var express = require('express');
const users = express();

const constants = require("../utils/config.js");

var userController = require("../controllers/userController");

const passport = require('passport');

users.post('/signup', userController.user_signup_post);

users.post('/login', userController.user_login_post);

users.put('/edit-profile', passport.authenticate('jwt', { session: false }), userController.user_edit_profile_put);

// users.get('/protected', passport.authenticate('jwt', { session: false }) , (req,res) => {
    
//     res.json({message: "inside protected", user:req.user})
// })
module.exports = users;
