import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        deleteComment: protectedResolver( async (_, { id }, { client, loggedInUser}) => {

            const comment = await client.comment.findUnique({
                where: { id },
                select: { userId: true }
            });

            if (!comment) {
                return {
                    status: false,
                    error: "Comment is not found."
                }
            }
            else if ( comment.userId !== loggedInUser.id) {
                return {
                    status: false,
                    error: "Not authorized."
                }
            }
            else {
                await client.comment.delete({
                    where: { id }
                });
                
                return {
                    status: true,
                }
            }
        })
    }
}

export default resolvers;