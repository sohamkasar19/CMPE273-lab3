// import { ATLAS_URI } from "./config";
const Item = require("../models/Item");
const Shop = require("../models/Shop");

exports.item_functions = (msg, action, callback) => {
  switch (action) {
    case "ADD":
      add_item(msg, callback);
      break;
    case "EDIT":
      edit_item(msg, callback);
      break;
    case "GET_ALL":
      get_all_items(msg, callback);
      break;
    case "GET_ITEM_BY_ID":
      get_item_by_id(msg, callback)
      break
    case "SEARCH_ITEM":
      search_item(msg, callback)
      break
    default:
      console.log("wrong action in item");
      break;
  }
};

const add_item = (msg, callback) => {
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
          callback(null, newItem);
        })
    )
    .catch((error) => {
      callback(error, null);
    });
};

const edit_item = (msg, callback) => {
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
      callback(null, item);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const get_all_items = (msg, callback) => {
  Item.find({}, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const get_item_by_id = (msg, callback) => {
  const itemId = msg.itemId;
  Item.find({
    _id: itemId,
  })
    .populate("SHOP")
    .exec()
    .then((item) => {
      callback(null, item);
    })
    .catch((error) => {
      callback(error, null);
    });
}

const search_item =  (msg, callback) => {
  const searchWord = msg.searchWord;
  Item.find(
    { 
      "ITEM_NAME": 
      { 
        "$regex": searchWord, 
        "$options": "i" 
      } 
    },
    function(err, items) {
       if(err) {
         callback(err, null)
       }
       else {
         callback(null, items)
       }
    })
}
