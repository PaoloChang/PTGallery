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
        photos: [Photo]
        following: [User]
        followers: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMine: Boolean!
        isFollowing: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;