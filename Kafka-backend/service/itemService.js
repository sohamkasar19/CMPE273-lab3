// import { ATLAS_URI } from "./config";
const Item = require("../models/Item");
const Shop = require("../models/Shop");

exports.add_item = (msg, callback) =>  {
  const {
    ItemName,
    ShopId,
    Category,
    QuantityAvailable,
    Price,
    Description,
    ItemImage,
  } = msg.data;
  // console.log(req.body.data);
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
          callback(null, newItem)
        })
    )
    .catch((error) => {
      callback(error, null)
    });
  
};

exports.edit_item = (msg, callback) => {
  const {
    ItemName,
    ItemId,
    ShopId,
    Category,
    QuantityAvailable,
    Price,
    Description,
    ItemImage,
  } = msg.data;
  Item.findOne({
    _id: ItemId,
  })
    .then((item) => {
      item.ITEM_NAME = ItemName;
      item.CATEGORY = Category;
      item.QUANTITY_AVAILABLE = QuantityAvailable;
      item.PRICE = Price;
      item.DESCRIPTION = Description;
      if (ItemImage) item.ITEM_IMAGE = ItemImage;
      item.save((error) => {
        if (error) {
          throw error;
        }
      });
      callback(null, item)
    })
    .catch((err) => {
      callback(err, null)
    });
}
