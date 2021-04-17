import gql from "graphql-tag";

export default gql`
  type SearchPhotosResult {
    status: Boolean!
    error: String
    photos: [Photo]
  }
  type Query {
    searchPhotos(keyword: String!, offset: Int): [Photo]
  }
`;
