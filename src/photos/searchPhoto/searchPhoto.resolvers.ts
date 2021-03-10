import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        searchPhoto: (_, { keyword, lastId }, { client }) => {
            /**
             * In lecture: search photos with caption that startsWith keyword
             * In exercise: search photos with hashtag that has keyword
             */
            const photos = client.photo.findMany({
                where: {
                    hashtags: {
                        some: {
                            hashtag: keyword
                        }
                    }
                },
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor : { id: lastId }})
            });
            return {
                status: true,
                photos
            }
        }
    }
}

export default resolvers;