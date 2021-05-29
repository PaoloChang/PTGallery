import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });

        if (!photo) {
          return {
            status: false,
            error: "Photo is not found.",
          };
        }

        const comment = await client.comment.create({
          data: {
            payload,
            user: {
              connect: { id: loggedInUser.id },
            },
            photo: {
              connect: { id: photoId },
            },
          },
        });

        return {
          status: true,
          id: comment.id,
        };
      }
    ),
  },
};
