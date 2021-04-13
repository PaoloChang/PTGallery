import gql from "graphql-tag";

export default gql`
  type Query {
    seeFeed(offset: Int): [Photo]
  }
`;
