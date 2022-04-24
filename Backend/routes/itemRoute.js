var express = require('express');
const item = express();

var itemController = require("../controllers/itemController");

const passport = require('passport');

item.post('/add-new', passport.authenticate('jwt', { session: false }), itemController.item_add_new);

item.post('/edit', passport.authenticate('jwt', { session: false }), itemController.item_edit);

item.get('/all',  itemController.item_all);

item.get('/details',  itemController.item_details_by_id);

item.get('/search',  itemController.item_search);

module.exports = item;