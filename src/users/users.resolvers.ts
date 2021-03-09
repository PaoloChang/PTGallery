import client from "../client"

export default {
    User: {
        /** In first argument root has current user information */
        totalFollowing: ({ id }) => 
            client.user.count({ 
                where: { 
                    followers: {
                        some: { id }
                    }
                }
            }),
        totalFollowers: ({ id }) => 
            client.user.count({
                where: {
                    following: {
                        some: { id }
                    }
                }
            }),
        isMyAccount: ({ id }, _, { loggedInUser }) => {
            // if (!loggedInUser) {
            //     return false;
            // }
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
                            id
                        }
                    }
                }
            })
            
            return Boolean(exist);
        }
    }
}