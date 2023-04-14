import { ImageData, PostData } from '../data/post';
// @ts-ignore
import { S3Client, PutObjectCommand, GetObjectCommand   } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

const client = new S3Client({ region: "us-east-1",
credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!} 
});
const bucketName = process.env.S3_BUCKET_NAME

export async function generateSignedUrls(posts: PostData[]) {
    const distributionDomain = process.env.AWS_DISTRIBUTION_DOMAIN;
    const privateKey = process.env.PRIVATE_KEY!
    const keyPairId = process.env.PUBLIC_KEY!
    
    for (const post of posts) {
        const new_imgs = [];
        for (const imgurl of post.imageurls) {
            const resourcePath = `/${imgurl}`;
            try {
                const url = getSignedUrl({
                    url: `https://${distributionDomain}${resourcePath}`,
                    keyPairId: keyPairId,
                    privateKey: privateKey,
                     // @ts-ignore
                    dateLessThan: new Date( Date.now() + (1000 /*sec*/ * 10))
                });
                new_imgs.push(url);
            } catch (err) {
                throw err
            }
        } 
        post.imageurls = new_imgs
    }
    return posts
}

export async function postToS3bucket(imageData: ImageData[]) {

    const images = imageData.map(img => ({Key: img.name, Body:img.buffer}))

    const upLoadPromises = images.map(image => uploadObjectToS3({
        Bucket: bucketName!,
        ...image,
    }))

    try {
        await Promise.all(upLoadPromises)
    } catch (err) {
        throw err;
    }
}                   

const uploadObjectToS3 = async (input : {"Body": Buffer, Bucket: string, Key: string}) => {
    try {
      const command = new PutObjectCommand(input);
      const response = await client.send(command);
      return response;
    } catch (err) {
      console.error(`Failed to upload object '${input.Key}':`, err);
      throw err;
    }
};