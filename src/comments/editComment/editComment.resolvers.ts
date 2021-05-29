import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });

        if (!comment) {
          return {
            status: false,
            error: "Comment is not found.",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            status: false,
            error: "Not authorized.",
          };
        } else {
          await client.comment.update({
            where: { id },
            data: {
              payload,
            },
          });

          return {
            status: true,
          };
        }
      }
    ),
  },
};
