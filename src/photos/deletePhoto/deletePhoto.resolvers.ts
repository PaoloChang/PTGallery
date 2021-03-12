import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        deletePhoto: protectedResolver( async (_, { id }, { client, loggedInUser }) => {
            const photo = await client.photo.findUnique({
                where: { id },
                select: { userId: true },
            });

            if (!photo) {
                return {
                    status: false,
                    error: "Photo not found."
                }
            }
            else if (photo.userId !== loggedInUser.id) {
                return {
                    status: false,
                    error: "Not authorized."
                }
            }
            else {
                await client.photo.delete({
                    where: { id }
                });

                return {
                    status: true
                }
            }
        })
    }
}

export default resolvers;