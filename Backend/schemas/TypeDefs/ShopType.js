const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

const ShopType = new GraphQLObjectType({
  name: "Shop",
  fields: {
    _id: {
      type: GraphQLString,
    },
    SHOP_NAME: {
      type: GraphQLString,
    },
    SHOP_IMAGE: {
      type: GraphQLString,
    },
    SHOP_ITEMS: {
      type: new GraphQLList(GraphQLString),
    },
    OWNER: {
      type: GraphQLString,
    }
  },
});

module.exports = ShopType;
