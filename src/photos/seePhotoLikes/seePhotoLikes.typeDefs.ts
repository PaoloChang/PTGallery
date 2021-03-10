import gql from "graphql-tag";

export default gql`
    type Query {
        seePhotoLikes(id:Int!): [User]
    }
`;