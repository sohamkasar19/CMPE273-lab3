import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query getUserById($_id: String!) {
    getUserById(_id: $_id) {
        NAME
        EMAIL
        PROFILE_IMAGE
        _id
    }
  }
`;