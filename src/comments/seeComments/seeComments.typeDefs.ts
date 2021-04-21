import gql from "graphql-tag";

export default gql`
  type Query {
    seeComments(photoId: Int!, offset: Int): [Comment]
  }
`;
