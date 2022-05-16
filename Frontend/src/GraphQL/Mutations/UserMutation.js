import { gql } from "@apollo/client";

export const EDIT_PROFILE = gql`
  mutation editUserProfile($email: String, $name: String, $phonenumber: String, $gender: String, $DOB: String, $city:String, $country:String, $profilephoto: String) {
    editUserProfile(email: $email, name: $name, phonenumber: $phonenumber, gender: $gender, DOB: $DOB, city:$city,country: $country, profilephoto: $profilephoto) {
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
