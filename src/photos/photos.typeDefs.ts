import gql from "graphql-tag";

export default gql`
    type Photo {
        id: Int!
        user: User!
        image: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag {
        id: Int!
        hashtag: String!
        photos: [Photo]
        createdAt: String!
        updatedAt: String!
    }
`;