const Order = require("../models/Order");
const User = require("../models/User");

exports.order_add = (req, res) => {
    const {userId , cartData} = req.body.data;
    const {addedItems , total} = cartData;
    var datetime = new Date();
    console.log(datetime.toISOString().slice(0,10));
    const orderItems = addedItems.map(item => {
        let newItem = {
            ORDER_ITEM: item._id,
            BUY_PRICE : item.PRICE,
            QUANTITY : item.quantityInCart,
            GIFT_WRAP : item.hasGiftWrap,
            MESSAGE: item.message
        }
        return newItem;
     });
    const newOrder = new Order({
        ORDER_DATE: datetime.toISOString().slice(0,10),
        TOTAL: total,
        ORDER_ITEMS: orderItems
    })
    newOrder.save()
    .then(
        User.findOne({
            _id: userId
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
    )
  }