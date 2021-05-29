import { Resolvers } from "../../types";

export default {
  Query: {
    searchPhotos: (_, { keyword, offset }, { client }) => {
      /**
       * In lecture: search photos with caption that startsWith keyword
       * In exercise: search photos with hashtag that has keyword
       */
      const photos = client.photo.findMany({
        where: {
          caption: {
            contains: keyword.toLowerCase(),
          },
        },
        // take: 5,
        // skip: lastId ? 1 : 0,
        // ...(lastId && { cursor: { id: lastId } }),
        // take: 2,
        // skip: offset,
      });

      return photos;
    },
  },
};
