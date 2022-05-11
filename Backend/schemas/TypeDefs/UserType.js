const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
  } = require("graphql");
  
  const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
      _id: {
        type: GraphQLString,
      },
      EMAIL: {
        type: GraphQLString,
      },
      NAME: {
        type: GraphQLString,
      },
      PASSWORD: {
        type: GraphQLString,
      },
      DOB: {
        type: GraphQLString,
      },
      PHONE_NO: {
        type: GraphQLString,
      },
      GENDER: {
        type: GraphQLString,
      },
      CITY: {
        type: GraphQLString,
      },
      ADDRESS: {
        type: GraphQLString,
      },
      COUNTRY: {
        type: GraphQLString,
      },
      ABOUT: {
        type: GraphQLString,
      },
      PROFILE_IMAGE: {
        type: GraphQLString,
      },
      SHOP: {
        type: GraphQLString,
      },
      ORDER_HISTORY: {
        type: new GraphQLList(GraphQLString)
      }
    },
  });
  
  module.exports = UserType;
  