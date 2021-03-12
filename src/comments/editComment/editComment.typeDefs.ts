import gql from "graphql-tag";

export default gql`
    type Mutation {
        editComment(id:Int!, payload:String!): MutationResponse!
    }
`;