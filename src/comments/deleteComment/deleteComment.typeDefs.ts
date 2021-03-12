import gql from "graphql-tag";

export default gql`
    type DeleteCommentResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        deleteComment(id:Int!): DeleteCommentResult!
    }
`;