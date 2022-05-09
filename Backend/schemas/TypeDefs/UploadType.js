const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLScalarType,
  } = require("graphql");
  const { GraphQLUpload } = require("graphql-upload");
  
  const UploadType = new GraphQLObjectType({
    name: "Upload",
    fields: {
      name: {
        type: GraphQLString,
      },
      type: {
        type: GraphQLString,
      },
      size: {
        type: GraphQLInt,
      },
      path: {
        type: GraphQLString,
      }
    },
  });
  
  module.exports = UploadType;
  