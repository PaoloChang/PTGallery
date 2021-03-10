import gql from "graphql-tag";

export default gql`
    type ToggleLikeResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        toggleLike(id:Int!): ToggleLikeResult!
    }
`;