var express = require('express');
const item = express();

var itemController = require("../controllers/itemController");

const passport = require('passport');

item.post('/add-new', passport.authenticate('jwt', { session: false }), itemController.item_add_new);

item.post('/edit', passport.authenticate('jwt', { session: false }), itemController.item_edit);

// item.post('/add-new-shop', passport.authenticate('jwt', { session: false }), shopController.shop_add_new);

// item.get('/details',  shopController.shop_details);

module.exports = item;