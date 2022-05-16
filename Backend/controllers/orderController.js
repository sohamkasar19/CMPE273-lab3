const Order = require("../models/Order");
const User = require("../models/User");
const Item = require("../models/Item");

exports.order_add = (args) => {
  const { userId, addedItems, total } = args;

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
      })
      .catch((error) => {
        console.log(error);
      })
  );
  console.log("inside ");
  return true;
};

exports.order_get = async  (args) => {
  const {userId} = args;
  let user = await User.findOne({
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
  return user.ORDER_HISTORY
    // .exec()
    // .then((user) => {
    //   console.log(user.ORDER_HISTORY);
    //   res.json({
    //     status: "ok",
    //     ORDER_HISTORY: user.ORDER_HISTORY,
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
};
