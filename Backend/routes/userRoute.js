var express = require('express');
const users = express();

const constants = require("../config/config.js");

var userController = require("../controllers/userController");

users.post('/signup', userController.user_signup_post);

module.exports = users;
