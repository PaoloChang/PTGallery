import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeHashtag: (_, { hashtag }, { client }) => {
            hashtag = client.hashtag.findUnique({ where: { hashtag }});
            return {
                status: true,
                hashtag
            }
        },
    }
}

export default resolvers;