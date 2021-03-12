import gql from "graphql-tag";

export default gql`
    type Mutation {
        deleteComment(id:Int!): MutationResponse!
    }
`;