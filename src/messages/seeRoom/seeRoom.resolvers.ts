import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
      return await client.room.findFirst({
        where: {
          id,
          users: {
            some: { id: loggedInUser.id },
          },
        },
      });
    }),
  },
};
