const graphql = require("graphql");
const ItemType = require("./TypeDefs/ItemType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
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
  fields: {},
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
