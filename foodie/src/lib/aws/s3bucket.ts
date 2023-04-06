import { ImageData } from '../data/post';
import { S3Client, PutObjectCommand  } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1",
credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!} 
});
const bucketName = process.env.S3_BUCKET_NAME

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
      console.log(`Object '${input.Key}' uploaded successfully.`);
      return response;
    } catch (err) {
      console.error(`Failed to upload object '${input.Key}':`, err);
      throw err;
    }
};