import client from "../client";

export default {
  User: {
    /** In first argument root has current user information */
    photos: ({ id }, { lastId }) => {
      return client.user
        .findUnique({
          where: { id },
        })
        .photos({
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
    },
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),
    isMine: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser?.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const exist = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });

      return Boolean(exist);
    },
  },
};
