import gql from "graphql-tag";

export default gql`
  type Query {
    seeFeeds(lastId: Int): [Photo]
  }
`;
