const graphql = require("graphql");
const ItemType = require("./TypeDefs/ItemType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = graphql;

var itemController = require("../controllers/itemController");
const Item = require("../models/Item");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllItem: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return itemController.item_all(args);
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
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
