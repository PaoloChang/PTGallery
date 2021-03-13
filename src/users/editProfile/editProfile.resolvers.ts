import { createWriteStream } from 'fs';
import * as bcrypt from 'bcryptjs';
import { protectedResolver } from '../users.utils';
import { Resolvers } from '../../types';
import { uploadImageToS3 } from '../../shared/shared.utils';

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectedResolver( async (
            _, 
            { firstName, lastName, username, email, avatar, bio, password:newPassword },
            { client, loggedInUser }
        ) => {
        
            let avatarURL = null;
        
            if (avatar) {
                /**
                 * Phase 1. Save image to the database by using node.js
                 *          writeStream is an example of saving files by using node.js
                 * Phase 2. Save image to the AWS and add returned URL to the database
                 */

                // const { filename, createReadStream } = await avatar;
                // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                // const readStream = createReadStream();
                // const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                // readStream.pipe(writeStream);
                // avatarURL = `http://localhost:4000/static/${newFilename}`;

                /** Phase 2: AWS S3 */
                avatarURL = await uploadImageToS3(avatar, loggedInUser.id, "avatars");
            }
        
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
                    ...(hashPassword && { password: hashPassword }),
                    ...(avatarURL && { avatar: avatarURL })
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
        })
    }
}

export default resolvers;