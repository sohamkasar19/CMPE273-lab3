var express = require('express');
const users = express();

const constants = require("../utils/config.js");

var userController = require("../controllers/userController");
const { checkAuth } = require('../utils/authPassport.js');
const passport = require('passport');

users.post('/signup', userController.user_signup_post);

users.post('/login', userController.user_login_post);

// users.get('/protected', passport.authenticate('jwt', { session: false }) , (req,res) => {
    
//     res.json({message: "inside protected", user:req.user})
// })
module.exports = users;
