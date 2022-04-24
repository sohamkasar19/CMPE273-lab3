const Item = require("../models/Item");
const Shop = require("../models/Shop");
var kafka = require("../kafka/client");

exports.item_add_new = async (req, res) => {
  kafka.make_request("item-topic", "ADD",  req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        status: "ok",
        message: "item added",
      });
      res.end();
    }
  });
};

exports.item_edit = async (req, res) => {
  // const {
  //   ItemName,
  //   ItemId,
  //   ShopId,
  //   Category,
  //   QuantityAvailable,
  //   Price,
  //   Description,
  //   ItemImage,
  // } = req.body.data;
  // // console.log(req.body.data);
  // Item.findOne({
  //   _id: ItemId,
  // })
  //   .then((item) => {
  //     item.ITEM_NAME = ItemName;
  //     item.CATEGORY = Category;
  //     item.QUANTITY_AVAILABLE = QuantityAvailable;
  //     item.PRICE = Price;
  //     item.DESCRIPTION = Description;
  //     if (ItemImage) item.ITEM_IMAGE = ItemImage;
  //     item.save((error) => {
  //       if (error) {
  //         throw error;
  //       }
  //     });
  //     res.json({
  //       status: "ok",
  //       item: item,
  //     });
  //   })
  //   .catch((err) => {
  //     res.json({
  //       status: "error",
  //       error: err,
  //       message: "error while updating item",
  //     });
  //   });
  kafka.make_request("item-topic", "EDIT", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({
        status: "ok",
        item: results
      });
      res.end();
    }
  });
};

exports.item_all = async (req, res) => {
  // Item.find({}, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(result);
  //   }
  // });
  kafka.make_request("item-topic", "GET_ALL", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json(results);
      res.end();
    }
  });
};

exports.item_details_by_id = async (req, res) => {
  // const itemId = req.query.itemId;
  // Item.find({
  //   _id: itemId,
  // })
  //   .populate("SHOP")
  //   .exec()
  //   .then((item) => {
  //     res.json({ status: "ok", item: item });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  kafka.make_request("item-topic", "GET_ITEM_BY_ID", req.query, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.json({ status: "ok", item: results });
      res.end();
    }
  });
};

exports.item_search = async (req, res) => {
//   const searchWord = req.query.searchWord;
//   Item.find(
//     { 
//       "ITEM_NAME": 
//       { 
//         "$regex": searchWord, 
//         "$options": "i" 
//       } 
//     },
//     function(err, items) {
//        if(err) {
//          res.json({status : "error"})
//        }
//        else {
//          res.json(items)
//        }
//     } 
// );
kafka.make_request("item-topic", "SEARCH_ITEM", req.query, function (err, results) {
  if (err) {
    console.log("Inside err");
    res.json({
      status: "error",
      msg: "System Error, Try Again.",
    });
  } else {
    console.log("Inside else");
    res.json(results);
  }
});

}
