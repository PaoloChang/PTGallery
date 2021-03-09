import { gql } from "apollo-server-core";

export default gql`
    type UnfollowUserResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        unfollowUser(username: String!): UnfollowUserResult
    }
`;