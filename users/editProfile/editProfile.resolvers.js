import bcrypt from 'bcrypt';
import client from "../../client";
import { protectedResolver } from '../users.utils';

const resolverFunc = async (
    _, 
    { firstName, lastName, username, email, password:newPassword },
    { loggedInUser }
) => {
    let hashPassword = null;

    if (newPassword) {
        hashPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id
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

export default {
    Mutation: {
        editProfile: protectedResolver(resolverFunc)
    }
}