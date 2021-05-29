import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeMe: protectedResolver((_, __, { client, loggedInUser }) =>
      client.user.findUnique({
        where: { id: loggedInUser.id },
      })
    ),
  },
};
