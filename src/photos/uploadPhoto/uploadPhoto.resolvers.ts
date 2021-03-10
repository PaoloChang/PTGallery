import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { extractHashtagsIntoArray } from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver( async (
            _, 
            { image, caption },
            { client, loggedInUser }
        ) => {

            let hashtagObjs = [];

            if (caption) {
                hashtagObjs = extractHashtagsIntoArray(caption);
            }
            
            await client.photo.create({
                data: {
                    image,
                    caption,
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    ...(hashtagObjs.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagObjs
                        }
                    })
                }
            })

            // save the photo with the parsed hashtags
            // add the photo to the hashtags
            return {
                status: true,
                image
            }
        })
    }
}

export default resolvers;