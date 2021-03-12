import gql from "graphql-tag";

export default gql`
    type Comment {
        id: Int!
        user: User!
        photo: Photo!
        payload: String!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;