import { gql } from "apollo-server-core";

export default gql`
    type FollowUserResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        followUser(username: String): FollowUserResult
    }
`;