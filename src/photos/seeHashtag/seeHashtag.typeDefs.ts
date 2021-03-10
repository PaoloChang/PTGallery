import gql from "graphql-tag";

export default gql`
    type SeeHashtagResult {
        status: Boolean!
        error: String
        hashtag: Hashtag
    }
    type Query {
        seeHashtag(hashtag:String!): SeeHashtagResult!
    }
`;