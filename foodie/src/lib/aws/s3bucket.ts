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
    const getObjectParams = {
        Bucket: bucketName,
        Key: posts[0].imageurls[0]
    }

    const distributionDomain = process.env.AWS_DISTRIBUTION_DOMAIN;
    const resourcePath = `/${posts[0].imageurls[0]}`;
    const privateKey = process.env.PRIVATE_KEY!
    const keyPairId = process.env.PUBLIC_KEY!

   
    const url = getSignedUrl({
        url: `https://${distributionDomain}${resourcePath}`,
        keyPairId: keyPairId,
        privateKey: privateKey,
         // @ts-ignore
        dateLessThan: new Date( Date.now() + (1000 /*sec*/ * 10))
    });
    // new Date( Date.now() + (1000 /*sec*/ * 60)).toDateString()
    console.log("url")
    console.log(url)
}

export async function postToS3bucket(imageData: ImageData[]) {

    const images = imageData.map(img => ({Key: img.name, Body:img.buffer}))

    const upLoadPromises = images.map(image => uploadObjectToS3({
        Bucket: bucketName!,
        ...image,
    }))

    try {
        await Promise.all(upLoadPromises)
        return true
    } catch (err) {
        return false
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