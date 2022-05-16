const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLScalarType
} = require("graphql");

const OrderItemType = new GraphQLScalarType({
  name: "OrderItem",
  fields: {
    ORDER_ITEM: {
      type: GraphQLString,
    },
    GIFT_WRAP: {
      type: GraphQLBoolean,
    },
    BUY_PRICE: {
      type: GraphQLFloat,
    },
    QUANTITY: {
      type: GraphQLInt,
    },
    MESSAGE: {
      type: GraphQLString,
    },
  },
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: {
    _id: {
      type: GraphQLString,
    },
    ORDER_DATE: {
      type: GraphQLString,
    },
    TOTAL: {
      type: GraphQLFloat,
    },
    ORDER_ITEMS: {
      type: new GraphQLList(OrderItemType),
    },
  },
});

module.exports = OrderType;
