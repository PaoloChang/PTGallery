import gql from "graphql-tag";

export default gql`
    type SeePhotoResult {
        status: Boolean!
        error: String
        photo: Photo
    }
    type Query {
        seePhoto(id:Int!): SeePhotoResult!
    }
`;