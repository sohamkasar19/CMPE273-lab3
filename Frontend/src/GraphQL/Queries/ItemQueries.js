import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
  query {
    getAllItem {
      ITEM_NAME
      _id
      PRICE
      ITEM_IMAGE
      SHOP
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query {
    findItem {
      ITEM_NAME
      _id
      PRICE
      ITEM_IMAGE
      SHOP
    }
  }
`;