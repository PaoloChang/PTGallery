import client from "../../client"

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {

            const validUser = await client.user.findUnique({
                where: { username },
                select: { id: true }
            });

            if (!validUser) {
                return {
                    status: false,
                    error: "User does not exist."
                }
            }

            /**
             * Two options to find followers:
             * (a) find an account by username and find the followers of the account
             * (b) find people who follow a specific account
             */
            const followers = await client.user
                .findUnique({ where: { username }})
                .followers({
                    take: 5,
                    skip: (page -1) * 5
                });

            const totalFollowers = await client.user.count({ 
                where: { 
                    following: {
                        some: { username }
                    }
                }
            });

            return {
                status: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5)
            }
        }
    }
}