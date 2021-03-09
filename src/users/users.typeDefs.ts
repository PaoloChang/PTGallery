import { gql } from "apollo-server-core";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        following: [User]
        followers: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMyAccount: Boolean!
        isFollowing: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;