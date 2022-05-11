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

export const USER_LOGIN = gql`
  query userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
        NAME
        EMAIL
        PROFILE_IMAGE
        _id
        DOB
        PHONE_NO
        GENDER
        CITY
        ADDRESS
        COUNTRY
        ABOUT
        SHOP
    }
  }
`;

export const USER_SIGNUP = gql`
  query userSignup($email: String!, $password: String!, $name: String!) {
    userSignup(email: $email, password: $password, name: $name) {
        NAME
        EMAIL
        _id
    }
  }
`;