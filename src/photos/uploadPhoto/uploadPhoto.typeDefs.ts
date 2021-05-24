import gql from "graphql-tag";

export default gql`
  type UploadPhotoResult {
    status: Boolean!
    error: String
    image: Photo
  }
  type Mutation {
    uploadPhoto(image: Upload!, caption: String): Photo
  }
`;
