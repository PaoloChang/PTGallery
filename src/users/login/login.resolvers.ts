import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
    Mutation: {
        login: async(_, { username, password }, { client }) => {

            /** (1) find the user with args.username */
            const user = await client.user.findFirst({
                where: { username }
            })

            if (!user) {
                return {
                    status: false, error: "Username is not valid."
                }
            }

            /** (2) check password with args.password */
            const validation = await bcrypt.compare(password, user.password);

            if (!validation) {
                return {
                    status: false, error: "Password is not valid."
                }
            }

            /** (3) issue and return a token to the user */
            const token = await jwt.sign({id:user.id}, process.env.PRIVATE_KEY);

            return {
                status: true, token: token
            }
        }
    }
}

export default resolvers;