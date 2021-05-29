import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { extractHashtagsFrom } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: { hashtag: true },
            },
          },
        });

        if (!oldPhoto) {
          return {
            status: false,
            error: "Photo not found",
          };
        }

        const newPhoto = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: extractHashtagsFrom(caption),
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
