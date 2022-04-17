// import { ATLAS_URI } from "./config";
const Item = require("../models/Item");
const Shop = require("../models/Shop");
var mongoose = require("mongoose");
const ATLAS_URI = "mongodb+srv://dbuser:dbpassword@etsy-cluster.l1wsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(ATLAS_URI, { useNewUrlParser: true });



function handle_request(msg, callback)  {
  console.log("Inside book kafka backend", msg);
  // console.log(msg);

  // books.push(msg);
  // callback(null, books);
  // console.log("after callback");
  const {
    ItemName,
    ShopId,
    Category,
    QuantityAvailable,
    Price,
    Description,
    ItemImage,
  } = msg.data;
  const newItem = new Item({
    ITEM_NAME: ItemName,
    SHOP: ShopId,
    CATEGORY: Category,
    ITEM_IMAGE: ItemImage,
    PRICE: Price,
    QUANTITY_AVAILABLE: QuantityAvailable,
    QUANTITY_SOLD: 0,
    DESCRIPTION: Description,
  });
  newItem
    .save()
    .then(
      Shop.findOne({
        _id: ShopId,
      })
        .exec()
        .then((shop) => {
          shop.SHOP_ITEMS.push(newItem);
          shop.save();
          console.log(shop);
          callback(null, newItem);
        })
        .catch((error) => {
          callback(error, null);
        })
    )
    .catch((error) => {
      callback(error, null);
    });
};
exports.handle_request = handle_request;