const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLScalarType,
  } = require("graphql");
  const { GraphQLUpload } = require("graphql-upload");
  
  const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: {
      file: {
        type: GraphQLString,
      },
    },
  });
  
  module.exports = ImageType;
  