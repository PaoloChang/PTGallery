import gql from "graphql-tag";

export default gql`
    type SearchPhotoResult {
        status: Boolean!
        error: String
        photos: [Photo]
    }
    type Query {
        searchPhoto(id:Int, keyword:String): SearchPhotoResult!
    }
`;