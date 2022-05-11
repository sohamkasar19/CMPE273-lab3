const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
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
    },
  });
  
  module.exports = UserType;
  