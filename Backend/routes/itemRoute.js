var express = require('express');
const item = express();

var itemController = require("../controllers/itemController");

const passport = require('passport');

item.post('/add-new', passport.authenticate('jwt', { session: false }), itemController.item_add_new);

item.post('/edit', passport.authenticate('jwt', { session: false }), itemController.item_edit);

item.get('/all',  itemController.item_all);

module.exports = item;