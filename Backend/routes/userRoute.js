var express = require('express');
const users = express();

const constants = require("../utils/config.js");

var userController = require("../controllers/userController");

users.post('/signup', userController.user_signup_post);

users.post('/login', userController.user_login_post);

module.exports = users;
