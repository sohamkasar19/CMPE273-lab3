const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const TestType = require('./TypeDefs/TestType')

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      getTest: {
        type: TestType,
        resolve(parent, args) {
          return { message: "Hello" };
        },
      },
    },
  });
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addMessage: {
        type: TestType,
        args: {
          message: { type: GraphQLString },
        },
        resolve(parent, args) {
          return args;
        },
      },
    },
  });

module.exports =  new GraphQLSchema({ query: RootQuery, mutation: Mutation });