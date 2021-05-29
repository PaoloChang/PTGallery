import { Resolvers } from "../../types";

export default {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) => {
      hashtag = client.hashtag.findUnique({ where: { hashtag } });
      return {
        status: true,
        hashtag,
      };
    },
  },
};
