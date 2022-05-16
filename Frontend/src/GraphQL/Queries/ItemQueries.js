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

export const GET_ITEM_LIST = gql`
  query findItemList($idList: [String]) {
    findItemList(idList: $idList) {
      ITEM_NAME
      QUANTITY_AVAILABLE
      CATEGORY
      _id
      ITEM_IMAGE
      DESCRIPTION
      PRICE
      QUANTITY_SOLD
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query findItem($_id: String!) {
    findItem(_id: $_id) {
      ITEM_NAME
      QUANTITY_AVAILABLE
      CATEGORY
      _id
      ITEM_IMAGE
      DESCRIPTION
      PRICE
      QUANTITY_SOLD
      SHOP
    }
  }
`;

export const GET_ITEM_BY_NAME = gql`
  query findItemByName($searchWord: String!) {
    findItemByName(searchWord: $searchWord) {
      ITEM_NAME
      QUANTITY_AVAILABLE
      CATEGORY
      _id
      ITEM_IMAGE
      DESCRIPTION
      PRICE
      QUANTITY_SOLD
    }
  }
`;
