import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { generateSignedUrl, generateSignedUrls, postToS3bucket } from "../aws/s3bucket";
import { IFile, ImageData, PostData } from "../data/post";
import { getFirstPostData, getPostData, getPostDataById, postData } from "../data/post.data";
import { generateImgName, generatePostName } from "../utils/imgName";
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

export async function getPostById(id :string): Promise<PostData | null> {
    try {
        const post = await getPostDataById(id)
        if (!post) {
            return null
        }
        const signedPost = generateSignedUrl(post)
        return signedPost
    } catch (err) {
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

    // generate hash_id
    const hashed_id = await generatePostName()

    // save to Mongo
    const data: PostData = {
        imageurls: imageData.map((img) => img.name),
        hashed_id,
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

export async function deletePost() {
    try {
    } catch (err){
        throw err
    }
}
