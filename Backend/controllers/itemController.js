const Item = require("../models/Item");
const Shop = require("../models/Shop");

exports.item_add_new = async (args) => {
  const {
    ITEM_NAME,
    SHOP,
    CATEGORY,
    ITEM_IMAGE,
    PRICE,
    QUANTITY_AVAILABLE,
    DESCRIPTION,
  } = args;
  const newItem = new Item({
    ITEM_NAME: ITEM_NAME,
    SHOP: SHOP,
    CATEGORY: CATEGORY,
    ITEM_IMAGE: ITEM_IMAGE,
    PRICE: PRICE,
    QUANTITY_AVAILABLE: QUANTITY_AVAILABLE,
    QUANTITY_SOLD: 0,
    DESCRIPTION: DESCRIPTION,
  });
  return newItem
    .save()
    .then(
      Shop.findOne({
        _id: SHOP,
      })
        .exec()
        .then((shop) => {
          shop.SHOP_ITEMS.push(newItem);
          shop.save();
          return "Done";
        })
        .catch((error) => {
          console.log(error);
        })
    )
    .catch((error) => {
      console.log(error);
    });
};

exports.item_edit = (args) => {
  const {
    _id,
    ITEM_NAME,
    SHOP,
    CATEGORY,
    ITEM_IMAGE,
    PRICE,
    QUANTITY_AVAILABLE,
    DESCRIPTION,
  } = args;
  // console.log(req.body.data);
  return Item.findOne({
    _id: _id,
  })
    .then((item) => {
      item.ITEM_NAME = ITEM_NAME;
      item.CATEGORY = CATEGORY;
      item.QUANTITY_AVAILABLE = QUANTITY_AVAILABLE;
      item.PRICE = PRICE;
      item.DESCRIPTION = DESCRIPTION;
      if (ITEM_IMAGE) item.ITEM_IMAGE = ITEM_IMAGE;
      item.save((error) => {
        if (error) {
          throw error;
        }
      });
      return item;
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

exports.item_details_by_id = (args) => {
  const { _id } = args;
  console.log(_id, "id");
  return (
    Item.findOne({
      _id: _id,
    })
      // .populate("SHOP")
      .exec()
      .then((item) => {
        return item;
      })
      .catch((error) => {
        console.log(error);
      })
  );
};

exports.item_search = (args) => {
  const { searchWord } = args;
  return Item.find(
    {
      ITEM_NAME: {
        $regex: searchWord,
        $options: "i",
      },
    }
    // ,
    // function (err, items) {
    //   if (err) {
    //     console.log("error", err);
    //   } else {
    //     return items;
    //   }
    // }
  );
};

exports.item_list = (args) => {
  const { idList } = args;
  return Item.find({
    _id: { $in: idList },
  });
};
