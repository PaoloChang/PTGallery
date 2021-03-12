import gql from "graphql-tag";

export default gql`
    type MutationResponse {
        status: Boolean!
        error: String
    }
`;