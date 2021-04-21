import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
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

export default resolvers;
