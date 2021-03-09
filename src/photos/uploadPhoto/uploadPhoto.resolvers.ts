import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectedResolver( async (
            _, 
            { image, caption },
            { client, loggedInUser }
        ) => {

            let hashtagObjs = [];

            if (caption) {
                // parse caption
                const hashtags = caption.match(/#[\w]+/g);
                console.log(`hashtags: ${hashtags}`)
                // get or create Hashtags

                hashtagObjs = hashtags.map(hashtag => ({ 
                    where: { hashtag },
                    create: { hashtag }
                }));
                console.log(`hashtagObjs: ${hashtagObjs}`);
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