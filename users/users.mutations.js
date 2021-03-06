import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from "../client"

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password
        }) => {

            try {
                /** (1) search a user with the same username OR email */
                const existingUser = await client.user.findFirst({
                    where: { 
                        OR: [
                            { username }, { email }
                        ]
                    }
                });

                if (existingUser) {
                    throw new Error("This username or email is already taken.");
                }
                
                /** (2) apply hash password to current password */
                const hashPassword = await bcrypt.hash(password, 10);
                
                /** (3) create a user with the data given and return the user */
                return client.user.create({
                    data: {
                        username, 
                        email, 
                        firstName, 
                        lastName, 
                        password: hashPassword
                    }
                });
            } catch (e) {
                return e;
            }
        },
        login: async(_, { username, password }) => {

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