// import { ATLAS_URI } from "./config";
const Order = require("../models/Order");
const User = require("../models/User");
const Item = require("../models/Item");

exports.order_functions = (msg, action, callback) => {
  console.log("action",action);
  switch (action) {
    case "ADD":
      add_order(msg, callback);
      break;
    case "GET":
      get_order(msg, callback);
      break
    default:
      console.log("wrong action in order");
      break;
  }
};

const add_order = (msg, callback) => {
  console.log("inside add order");
  const { userId, cartData } = msg.data;
  const { addedItems, total } = cartData;
  var datetime = new Date();
  const orderItems = addedItems.map((item) => {
    Item.findOne({
      _id : item._id
    })
    .then(item_ => {
      item_.QUANTITY_AVAILABLE -= item.quantityInCart
      item_.QUANTITY_SOLD += item.quantityInCart
      item_.save((error) => {
        if (error) {
          throw error;
        }
      });
    })
    let newItem = {
      ORDER_ITEM: item._id,
      BUY_PRICE: item.PRICE,
      QUANTITY: item.quantityInCart,
      GIFT_WRAP: item.hasGiftWrap,
      MESSAGE: item.message,
    };
    return newItem;
  });
  const newOrder = new Order({
    ORDER_DATE: datetime.toISOString(),
    TOTAL: total,
    ORDER_ITEMS: orderItems,
  });
  newOrder.save().then(
    User.findOne({
      _id: userId,
    })
      .then((user) => {
        user.ORDER_HISTORY.push(newOrder);
        user.save();
        callback(null, user)
      })
      .catch((error) => {
        callback(error, null)
      })
  );
};

const get_order = (msg, callback) => {
  const userId = msg.userId;
  User.findOne({
    _id: userId,
  })
  .populate({
    path: "ORDER_HISTORY",
    model: "Order",
    populate: {
      path: "ORDER_ITEMS.ORDER_ITEM",
      model: "Item",
    },
  })
  .exec()
  .then(user => {
      callback(null, user.ORDER_HISTORY)
  })
  .catch(error=> {
    console.log(error);
    callback(error, null)
  })
};


