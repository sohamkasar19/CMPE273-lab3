import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query getOrders($userId: String) {
    getOrders(userId: $userId) {
        _id
        ORDER_DATE
        TOTAL
        ORDER_ITEMS
    }
  }
`;


