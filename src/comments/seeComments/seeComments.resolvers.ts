import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeComments: protectedResolver((_, { photoId, offset }, { client }) =>
      client.comment.findMany({
        where: { photoId },
        include: { user: true },
        take: 8,
        skip: offset,
      })
    ),
  },
};
