import gql from "graphql-tag";

export default gql`
    type EditPhotoResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        editPhoto(id: Int!, caption:String!): EditPhotoResult!
    }
`;