import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seePhoto: (_, { id }, { client } ) => {
            const photo = client.photo.findUnique({ where: { id }})
            
            return {
                status: true,
                photo
            }
        }
    }
}

export default resolvers;