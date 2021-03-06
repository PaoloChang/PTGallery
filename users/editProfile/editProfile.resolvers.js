import bcrypt from 'bcrypt';
import client from "../../client"

export default {
    Mutation: {
        editProfile: async (
            _, 
            {firstName, lastName, username, email, password:newPassword }
        ) => {

            // const { id } = await jwt.verify(token, process.env.PRIVATE_KEY)

            let hashPassword = null;

            if (newPassword) {
                hashPassword = await bcrypt.hash(newPassword, 10);
            }

            const updatedUser = await client.user.update({
                where: {
                    id,
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(hashPassword && { password: hashPassword})
                }
            });

            if (updatedUser.id) {
                return {
                    status: true
                }
            }
            else {
                return {
                    status: false,
                    error: "Could not update profile."
                }
            }
        }
    }
}