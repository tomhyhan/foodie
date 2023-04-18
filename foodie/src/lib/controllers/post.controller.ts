import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { generateSignedUrls, postToS3bucket } from "../aws/s3bucket";
import { IFile, ImageData, PostData } from "../data/post";
import { getFirstPostData, getPostData, postData } from "../data/post.data";
import { generateImgName } from "../utils/imgName";
import { resize } from "../utils/resizeImg";


export async function getImages(email: string, page : number) : Promise<PostData[]>  {
    try {
        const posts = await getPostData(email, page)
        const signedPosts = await generateSignedUrls(posts!)
        return signedPosts
    } catch (err){
        throw err
    }
}

export async function getServersideImages(email: string, page : number) : Promise<PostData[]>  {
    try {
        const posts = await getFirstPostData(email, page)
        const signedPosts = await generateSignedUrls(posts!)
        return signedPosts
    } catch (err){
        throw err
    }
}



export async function postImages(images: IFile[],user: User) {
    // resize images
    const imageData: ImageData[] = [];
    for (const image of images) {
        const buffer = await resize(image)  
        const name = await generateImgName()
        imageData.push({buffer,name})
    }

    // save to AWS S3 bucket
    try {
        await postToS3bucket(imageData);
    } catch(err){
        throw err
    }
    // save to Mongo
    const data: PostData = {
        imageurls: imageData.map((img) => img.name),
        user: {
            connect: {
                id: user.id
            }
        }
    }

    try {
        await postData(data)
    } catch(err) {
        throw err
    }
}
