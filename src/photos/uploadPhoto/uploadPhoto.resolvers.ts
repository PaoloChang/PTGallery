import { uploadImageToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { extractHashtagsFrom } from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver( async (
            _, 
            { image, caption },
            { client, loggedInUser }
        ) => {

            let hashtagObjs = [];

            if (caption) {
                hashtagObjs = extractHashtagsFrom(caption);
            }
            
            const imageURL = await uploadImageToS3(image, loggedInUser.id, "galleries");

            await client.photo.create({
                data: {
                    image: imageURL,
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