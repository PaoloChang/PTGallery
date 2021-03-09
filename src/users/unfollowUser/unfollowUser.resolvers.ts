import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
    Mutation: {
        unfollowUser: protectedResolver( async (_, { username }, { client, loggedInUser }) => {
            
            const validUser = await client.user.findUnique({ where: { username }});

            if (!validUser) {
                return {
                    status: false,
                    error: "Username does not exist."
                };
            }

            await client.user.update({ 
                where: {
                    id: loggedInUser.id
                },
                data: {
                    following: {
                        disconnect: {
                            username
                        }
                    }
                }
            });

            return {
                status: true
            }
        })
    }
}

export default resolvers;