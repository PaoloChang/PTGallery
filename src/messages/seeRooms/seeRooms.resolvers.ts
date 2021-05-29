import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeRooms: protectedResolver(async (_, __, { client, loggedInUser }) => {
      return await client.room.findMany({
        where: {
          users: {
            some: { id: loggedInUser.id },
          },
        },
      });
    }),
  },
};
