import { createWriteStream } from 'fs';
import bcrypt from 'bcrypt';
import client from "../../client";
import { protectedResolver } from '../users.utils';

const resolverFunc = async (
    _, 
    { firstName, lastName, username, email, avatar, bio, password:newPassword },
    { loggedInUser }
) => {

    /**
     * Phase 1. Save image to the database by using node.js
     *          writeStream is an example of saving files by using node.js
     * Phase 2. Save image to the AWS and add returned URL to the database
     */
    const { filename, createReadStream } = await avatar;

    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
    readStream.pipe(writeStream);

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
            bio,
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