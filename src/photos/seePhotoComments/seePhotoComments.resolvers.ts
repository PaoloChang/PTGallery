import { Resolvers } from "../../types";

export default {
  Query: {
    seePhotoComments: (_, { photoId, lastId }, { client }) => {
      return client.comment.findMany({
        where: { id: photoId },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "desc" },
      });
    },
  },
};
