import { gql } from "apollo-server-core";

export default gql`
    type createAccountResult {
        status: Boolean!
        error: String
    }
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            username: String!
            email: String!
            password: String!
        ): createAccountResult!
    }
`;