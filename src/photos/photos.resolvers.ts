import { Resolvers } from "../types"

const resolvers: Resolvers = {

    Photo: {
        user: ({ userId }, _, { client }) => {
            return client.user.findUnique({ where: { id: userId }});
        },
        hashtags: ({ id }, _, { client }) => {
            return client.hashtag.findMany({ 
                where: { 
                    photos: {
                        some: { id }
                    }
                }
            });
        },
        likes: ({ id }, _, { client }) => {
            return client.like.count({ where: { photoId: id }});
        },
        comments: ({ id }, _, { client }) => {
            return client.comment.count({ where: { photoId: id }});
        },
    },

    Hashtag: {
        photos: ({ id }, { lastId }, { client }) => {
            return client.photo.findMany({
                where: {
                    hashtags: {
                        some: { id }
                    }
                },
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor : { id: lastId }})
            });
        },
        totalPhotos: ({ id }, _, { client }) => {
            return client.photo.count({
                where: {
                    hashtags: {
                        some: { id }
                    }
                }
            })
        },
    }
}

export default resolvers;