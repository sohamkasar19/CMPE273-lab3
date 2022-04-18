var express = require('express');
const order = express();

var orderController = require("../controllers/orderController");

const passport = require('passport');

order.post('/add', passport.authenticate('jwt', { session: false }), orderController.order_add);

module.exports = order;