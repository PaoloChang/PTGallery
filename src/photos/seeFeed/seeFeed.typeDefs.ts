import gql from "graphql-tag";

export default gql`
    type Query {
        seeFeed(lastId:Int): [Photo]
    }
`;