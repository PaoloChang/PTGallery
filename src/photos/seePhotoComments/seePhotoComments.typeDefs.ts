import gql from "graphql-tag";

export default gql`
    type Query {
        seePhotoComments(photoId:Int!,lastID:Int): [Comment]
    }
`;