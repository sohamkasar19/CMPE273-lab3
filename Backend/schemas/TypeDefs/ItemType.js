const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const ItemType = new GraphQLObjectType({
  name: "Item",
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
  },
});

module.exports = ItemType;
