import gql from "graphql-tag";

export default gql`
    type DeletePhotoResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        deletePhoto(id:Int!): DeletePhotoResult!
    }
`;