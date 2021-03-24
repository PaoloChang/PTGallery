import gql from "graphql-tag";

export default gql`
  type MutationResponse {
    status: Boolean!
    id: Int
    error: String
  }
`;
