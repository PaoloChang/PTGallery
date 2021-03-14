import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
    Room: {
        users: ({ id }) => client.room.findUnique({ where: { id }}).users(),
        messages: ({ id }, { lastId }) => client.message.findMany({ 
            where: { roomId: id },
            take: 10,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor : { id: lastId }})
        }),
        unreadTotal: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return 0;
            }
            return client.message.count({
                where: {
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id
                        }
                    },
                    read: false
                }
            });
        }
    },
    Message: {
        user: ({ id }) => client.message.findUnique({ where: { id }}).user(),
    }
}

export default resolvers;