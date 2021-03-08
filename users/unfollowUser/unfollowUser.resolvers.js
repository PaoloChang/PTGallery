import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        unfollowUser: protectedResolver( async (_, { username }, { loggedInUser }) => {
            
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