import * as AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    },
});

export const uploadImageToS3 = async (file, userId, directory) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${directory}/${userId}-${Date.now()}-${filename}`
    const { Location } = await new AWS.S3().upload({
        Bucket: "ptgallery-uploads",
        Key: objectName,
        ACL: "public-read",
        Body: readStream,
    })
    .promise();
    return Location;
}