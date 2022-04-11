const Item = require("../models/Item");
const Shop = require("../models/Shop");

exports.item_add_new = async (req, res) => {
  const {
    ItemName,
    ShopId,
    Category,
    QuantityAvailable,
    Price,
    Description,
    ItemImage,
  } = req.body.data;
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
          res.json({
            status: "ok",
            message: "item added",
          });
        })
        .catch((error) => {
          console.log(error);
        })
    )
    .catch((error) => {
      console.log(error);
    });
};
