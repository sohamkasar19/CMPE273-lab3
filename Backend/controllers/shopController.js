const Shop = require("../models/Shop");
const User = require("../models/User");

exports.shop_check_name = (args) => {
  const { shopname } = args;
  return Shop.findOne(
    {
      SHOP_NAME: shopname,
    }
    // ,
    // (error, shop) => {
    //   if (error) {
    //     console.log(error, "error");
    //   } else {
    //     return shop;
    //   }
    // }
  );
};

exports.shop_add_new = (args) => {
  const { SHOP_NAME, OWNER } = args;
  const newShop = new Shop({
    SHOP_NAME: SHOP_NAME,
    OWNER: OWNER,
  });
  newShop.save(function (err) {
    if (err) {
      console.log(err,"error");
    } else {
      User.findOne({
        _id: OWNER,
      }).then((user) => {
        user.SHOP = newShop._id;
        user.save((error) => {
          if (error) {
            throw error;
          }
        });
      });
    }
  });
  return newShop;
};

exports.shop_details = (args) => {
  const {_id} = args;
  return Shop.findOne({
    _id: _id,
  })
    // .populate("OWNER")
    // .populate("SHOP_ITEMS")
    // .exec()
    // .then((shop) => {
    //   res.json({ status: "ok", shop: shop });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
};

exports.shop_add_photo = (args) => {
  const { ShopImage, ShopId } = args;
  // console.log(req.body.data);
  Shop.findOne({
    _id: ShopId,
  })
    .then((shop) => {
      // console.log(shop);
      shop.SHOP_IMAGE = ShopImage;
      shop.save();
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};

