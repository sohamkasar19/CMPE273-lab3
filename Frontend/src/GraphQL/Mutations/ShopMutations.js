import { gql } from "@apollo/client";

export const ADD_SHOP = gql`
  mutation addShop($SHOP_NAME: String, $OWNER: String) {
    addShop(SHOP_NAME: $SHOP_NAME, OWNER: $OWNER) {
      _id
    }
  }
`;
