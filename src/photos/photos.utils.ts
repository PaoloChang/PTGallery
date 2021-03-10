export const extractHashtagsIntoArray = (caption) => {
    
    const hashtags = caption.match(/#[\w]+/g) || [];
    return hashtags.map(hashtag => ({ 
        where: { hashtag },
        create: { hashtag }
    }));
}