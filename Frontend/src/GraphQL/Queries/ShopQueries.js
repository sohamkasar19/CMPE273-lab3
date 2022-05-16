import { gql } from "@apollo/client";

export const CHECK_SHOP_NAME = gql`
  query checkShopName($shopname: String!) {
    checkShopName(shopname: $shopname) {
      SHOP_NAME
    }
  }
`;

export const GET_SHOP = gql`
  query findShop($_id: String!) {
    findShop(_id: $_id) {
      _id
      SHOP_NAME
      SHOP_IMAGE
      SHOP_ITEMS
      OWNER
    }
  }
`;
