import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { client, loggedInUser }) => {
        const validUser = await client.user.findUnique({ where: { username } });

        if (!validUser) {
          return {
            status: false,
            error: "Username does not exist",
          };
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });

        return {
          status: true,
        };
      }
    ),
  },
};
