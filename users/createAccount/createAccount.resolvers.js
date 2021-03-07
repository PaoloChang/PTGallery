import bcrypt from 'bcryptjs';
import client from "../../client"

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
                await client.user.create({
                    data: {
                        username, 
                        email, 
                        firstName, 
                        lastName, 
                        password: hashPassword
                    }
                });
                return {
                    status: true
                }
            } catch (e) {
                return e;
            }
        }
    }
}