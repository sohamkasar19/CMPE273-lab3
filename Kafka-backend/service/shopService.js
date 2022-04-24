const Shop = require("../models/Shop");
const User = require("../models/User");

exports.shop_functions = (msg, action, callback) => {
  console.log("action", action);
  switch (action) {
    case "CHECK_NAME":
      shop_check_name(msg, callback);
      break;
    case "ADD":
      shop_add(msg, callback);
      break;
    case "GET":
      shop_details(msg, callback);
      break;
    case "ADD_PHOTO":
      shop_add_photo(msg, callback);
      break;
    default:
      console.log("wrong action in order");
      break;
  }
};
const shop_check_name = (msg, callback) => {
  const shopname = msg.data;
  Shop.findOne(
    {
      SHOP_NAME: shopname,
    },
    (error, shop) => {
      if (error) {
        callback(error, null);
      }
      if (shop) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  );
};

const shop_add = (msg, callback) => {
  const { shopname, userId } = msg.data;
  const newShop = new Shop({
    SHOP_NAME: shopname,
    OWNER: userId,
  });
  newShop.save(function (err) {
    if (err) {
      callback(err, null);
    } else {
      User.findOne({
        _id: userId,
      }).then((user) => {
        user.SHOP = newShop._id;
        user.save((error) => {
          if (error) {
            throw error;
          }
        });
        callback(null, newShop._id);
      });
    }
  });
};

const shop_details = (msg, callback) => {
  const shopid = msg.shopid;
  Shop.findOne({
    _id: shopid,
  })
    .populate("OWNER")
    .populate("SHOP_ITEMS")
    .exec()
    .then((shop) => {
      callback(null, shop);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const shop_add_photo = (msg, callback) => {
  const { ShopImage, ShopId } = msg.data;
  // console.log(req.body.data);
  Shop.findOne({
    _id: ShopId,
  })
    .then((shop) => {
      // console.log(shop);
      shop.SHOP_IMAGE = ShopImage;
      shop.save();
      callback(null, shop);
    })
    .catch((error) => {
      callback(error, null);
    });
};
