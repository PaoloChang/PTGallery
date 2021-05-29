import { Resolvers } from "../../types";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }, { client }) => {
      const validUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!validUser) {
        return {
          status: false,
          error: "User does not exist.",
        };
      }

      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        status: true,
        following,
      };
    },
  },
};
