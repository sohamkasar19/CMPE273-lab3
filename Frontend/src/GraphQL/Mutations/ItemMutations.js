import { gql } from "@apollo/client";

export const ADD_ITEM = gql`
  mutation addItem(
    $ITEM_NAME: String
    $SHOP: String
    $CATEGORY: String
    $ITEM_IMAGE: String
    $PRICE: Float
    $QUANTITY_AVAILABLE: Int
    $DESCRIPTION: String
  ) {
    addItem(
      ITEM_NAME: $ITEM_NAME
      SHOP: $SHOP
      CATEGORY: $CATEGORY
      ITEM_IMAGE: $ITEM_IMAGE
      PRICE: $PRICE
      QUANTITY_AVAILABLE: $QUANTITY_AVAILABLE
      DESCRIPTION: $DESCRIPTION
    ) {
      ITEM_NAME
    }
  }
`;

export const EDIT_ITEM = gql`
  mutation editItem(
    $_id: String
    $ITEM_NAME: String
    $SHOP: String
    $CATEGORY: String
    $ITEM_IMAGE: String
    $PRICE: Float
    $QUANTITY_AVAILABLE: Int
    $DESCRIPTION: String
  ) {
    editItem(
      _id: $_id
      ITEM_NAME: $ITEM_NAME
      SHOP: $SHOP
      CATEGORY: $CATEGORY
      ITEM_IMAGE: $ITEM_IMAGE
      PRICE: $PRICE
      QUANTITY_AVAILABLE: $QUANTITY_AVAILABLE
      DESCRIPTION: $DESCRIPTION
    ) {
      ITEM_NAME
    }
  }
`;
