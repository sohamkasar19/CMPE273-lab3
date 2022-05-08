const { GraphQLString, GraphQLObjectType } = require("graphql");

const TestType = new GraphQLObjectType({
  name: "Test", 
  fields: {
    message: {
      type: GraphQLString,
    },
  },
});

module.exports = TestType;
