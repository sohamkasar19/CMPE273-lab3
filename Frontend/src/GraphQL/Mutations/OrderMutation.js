import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
  mutation addOrder($addedItems: [AddedItem], $total: Float, $userId: String) {
    addOrder(addedItems: $addedItems, total: $total, userId: $userId) 
  }
`;
