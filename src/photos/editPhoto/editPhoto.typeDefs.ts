import gql from "graphql-tag";

export default gql`
    type Mutation {
        editPhoto(id: Int!, caption:String!): MutationResponse!
    }
`;