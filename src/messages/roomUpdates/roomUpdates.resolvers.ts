import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers, Subscription } from "../../types";

const resolvers: Resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, context, info) => {

                if (!context.loggedInUser) {
                    throw new Error("Access denied (Please login)");
                }
                
                const room = await context.client.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            some: { id: context.loggedInUser.id }
                        },
                    },
                    select: { id: true },
                });

                if (!room) {
                    throw new Error("Access denied");
                }
                
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    ({ roomUpdates }, { id }, { loggedInUser }) => {
                        /**
                         * Double check authentication 
                         * this is not neccessary
                         * add async key for the use
                         */
                        // if (roomUpdates.id === id) {
                        //     const room = await client.room.findFirst({
                        //         where: {
                        //             id,
                        //             users: {
                        //                 some: { id: loggedInUser.id }
                        //             },
                        //         },
                        //         select: { id: true },
                        //     });
                        //     if (!room) {
                        //         return false;
                        //     }
                        //     return true;
                        // }
                        return roomUpdates.roomId === id;
                    }
                )(root, args, context, info);
            }
        }
    }
}

export default resolvers;