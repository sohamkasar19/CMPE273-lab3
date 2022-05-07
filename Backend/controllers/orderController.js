const Order = require("../models/Order");
const User = require("../models/User");
const Item = require("../models/Item");

exports.order_add = (req, res) => {
  const { userId, cartData } = req.body.data;
  const { addedItems, total } = cartData;
  console.log("isnide order add", addedItems, total);
  var datetime = new Date();
  console.log(datetime.toISOString().slice(0, 10));
  const orderItems = addedItems.map((item) => {
    Item.findOne({
      _id: item._id,
    }).then((item_) => {
      item_.QUANTITY_AVAILABLE -= item.quantityInCart;
      item_.QUANTITY_SOLD += item.quantityInCart;
      item_.save((error) => {
        if (error) {
          throw error;
        }
      });
    });
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
    ORDER_DATE: datetime.toISOString().slice(0, 10),
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
        res.json({
          status: "ok",
          message: "order added",
        });
      })
      .catch((error) => {
        console.log(error);
      })
  );
  console.log("inside ");
};

exports.order_get = (req, res) => {
  const userId = req.query.userId;
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
    .then((user) => {
      console.log(user.ORDER_HISTORY);
      res.json({
        status: "ok",
        ORDER_HISTORY: user.ORDER_HISTORY,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
