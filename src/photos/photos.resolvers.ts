import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }, _, { client }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: { id },
          },
        },
      });
    },
    likes: ({ id }, _, { client }) => {
      return client.like.count({ where: { photoId: id } });
    },
    commentNumber: ({ id }, _, { client }) => {
      return client.comment.count({ where: { photoId: id } });
    },
    comments: ({ id }, _, { client }) => {
      return client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      });
    },
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const result = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (result) {
        return true;
      }
      return false;
    },
  },

  Hashtag: {
    photos: ({ id }, { lastId }, { client }) => {
      return client.photo.findMany({
        where: {
          hashtags: {
            some: { id },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    },
    totalPhotos: ({ id }, _, { client }) => {
      return client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      });
    },
  },
};

export default resolvers;
