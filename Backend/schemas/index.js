const graphql = require("graphql");
const ItemType = require("./TypeDefs/ItemType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLScalarType,
} = graphql;
const { GraphQLUpload } = require("graphql-upload");
const { v4: uuid } = require("uuid");

var itemController = require("../controllers/itemController");
var shopController = require("../controllers/shopController");
var userController = require("../controllers/userController");
var orderController = require("../controllers/orderController");

const Item = require("../models/Item");
const ShopType = require("./TypeDefs/ShopType");
const ImageType = require("./TypeDefs/ImageType");
const UploadType = require("./TypeDefs/UploadType");
const { uploadFileNew } = require("../utils/s3");
const UserType = require("./TypeDefs/UserType");
const OrderType = require("./TypeDefs/OrderType");

const AddedItemType = new GraphQLScalarType({
  name: "AddedItem",
  fields: {
    _id: {
      type: GraphQLString,
    },
    ITEM_NAME: {
      type: GraphQLString,
    },
    SHOP: {
      type: GraphQLString,
    },
    CATEGORY: {
      type: GraphQLString,
    },
    ITEM_IMAGE: {
      type: GraphQLString,
    },
    PRICE: {
      type: GraphQLFloat,
    },
    QUANTITY_AVAILABLE: {
      type: GraphQLInt,
    },
    QUANTITY_SOLD: {
      type: GraphQLInt,
    },
    DESCRIPTION: {
      type: GraphQLString,
    },
    quantityInCart: {
      type: GraphQLInt
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllItem: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return itemController.item_all(args);
      },
    },
    findItem: {
      type: ItemType,
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return itemController.item_details_by_id(args);
      },
    },
    findItemByName: {
      type: new GraphQLList(ItemType),
      args: {
        searchWord: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return itemController.item_search(args);
      },
    },
    findItemList: {
      type: new GraphQLList(ItemType),
      args: {
        idList: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return itemController.item_list(args);
      },
    },
    checkShopName: {
      type: ShopType,
      args: {
        shopname: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return shopController.shop_check_name(args);
      },
    },
    findShop: {
      type: ShopType,
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return shopController.shop_details(args);
      },
    },
    getUserById: {
      type: UserType,
      args: {
        _id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return userController.user_by_id(args);
      },
    },
    userLogin: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return userController.user_login_post(args);
      },
    },
    userSignup: {
      type: UserType,
      args: {
        name: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return userController.user_signup_post(args);
      },
    },
    getOrders: {
      type: new GraphQLList(OrderType),
      args: {
        userId: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return orderController.order_get(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemType,
      args: {
        ITEM_NAME: {
          type: GraphQLString,
        },
        SHOP: {
          type: GraphQLString,
        },
        CATEGORY: {
          type: GraphQLString,
        },
        ITEM_IMAGE: {
          type: GraphQLString,
        },
        PRICE: {
          type: GraphQLFloat,
        },
        QUANTITY_AVAILABLE: {
          type: GraphQLInt,
        },
        QUANTITY_SOLD: {
          type: GraphQLInt,
        },
        DESCRIPTION: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        //   console.log(args);
        return itemController.item_add_new(args);
      },
    },
    editItem: {
      type: ItemType,
      args: {
        _id: {
          type: GraphQLString,
        },
        ITEM_NAME: {
          type: GraphQLString,
        },
        SHOP: {
          type: GraphQLString,
        },
        CATEGORY: {
          type: GraphQLString,
        },
        ITEM_IMAGE: {
          type: GraphQLString,
        },
        PRICE: {
          type: GraphQLFloat,
        },
        QUANTITY_AVAILABLE: {
          type: GraphQLInt,
        },
        QUANTITY_SOLD: {
          type: GraphQLInt,
        },
        DESCRIPTION: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return itemController.item_edit(args);
      },
    },
    addShop: {
      type: ShopType,
      args: {
        SHOP_NAME: {
          type: GraphQLString,
        },
        OWNER: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return shopController.shop_add_new(args);
      },
    },
    uploadImage: {
      type: ImageType,
      args: {
        file: {
          type: GraphQLUpload,
        },
      },
      resolve(parent, args) {
        let key = imageUpload(args.file);
        return { file: key };
      },
    },
    addShopImage: {
      type: GraphQLBoolean,
      args: {
        ShopId: {
          type: GraphQLString,
        },
        ShopImage: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // console.log(args);
        return shopController.shop_add_photo(args);
      },
    },
    addOrder: {
      type: GraphQLBoolean,
      args: {
        userId: {
          type: GraphQLString,
        },
        total: {
          type: GraphQLFloat,
        },
        addedItems: {
          type: new GraphQLList(AddedItemType),
        },
      },
      resolve(parent, args) {
        console.log(args);
        return orderController.order_add(args);
      },
    },
    editUserProfile: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        phonenumber: {
          type: GraphQLString,
        },
        gender: {
          type: GraphQLString,
        },
        DOB: {
          type: GraphQLString,
        },
        address: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        profilephoto: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return userController.user_edit_profile_put(args);
      },
    }
  },
});

const imageUpload = async (file) => {
  console.log(file);
  const { createReadStream, filename } = await file;
  let key = uuid();
  let stream = createReadStream();
  const res = await uploadFileNew(stream, key);
  return key;
};

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
