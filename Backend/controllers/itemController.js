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

exports.item_edit = async (req, res) => {
  const {
    ItemName,
    ItemId,
    ShopId,
    Category,
    QuantityAvailable,
    Price,
    Description,
    ItemImage,
  } = req.body.data;
  // console.log(req.body.data);
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
      res.json({
        status: "ok",
        item: item,
      });
    })
    .catch((err) => {
      res.json({
        status: "error",
        error: err,
        message: "error while updating item",
      });
    });
};

exports.item_all = (args) => {
  return Item.find({}).then((res) => {
    return res;
  });
};

exports.item_details_by_id = async (req, res) => {
  const itemId = req.query.itemId;
  Item.find({
    _id: itemId,
  })
    .populate("SHOP")
    .exec()
    .then((item) => {
      res.json({ status: "ok", item: item });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.item_search = async (req, res) => {
  const searchWord = req.query.searchWord;
  Item.find(
    {
      ITEM_NAME: {
        $regex: searchWord,
        $options: "i",
      },
    },
    function (err, items) {
      if (err) {
        res.json({ status: "error" });
      } else {
        res.json(items);
      }
    }
  );
};
