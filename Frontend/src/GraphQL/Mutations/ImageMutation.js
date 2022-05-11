import { gql } from "@apollo/client";

export const IMAGE_UPLOAD = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      file
    }
  }
`;
