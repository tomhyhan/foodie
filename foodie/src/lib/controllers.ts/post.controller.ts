import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { generateSignedUrls, postToS3bucket } from "../aws/s3bucket";
import { IFile, ImageData, PostData } from "../data/post";
import { getPostData, postData } from "../data/post.data";
import { generateImgName } from "../utils/imgName";
import { resize } from "../utils/resizeImg";


export async function getImages(email: string) {
    const posts = await getPostData(email)
    const signedUrls = await generateSignedUrls(posts!)
}

export async function postImages(images: IFile[],user: User) {


    // resize images
    const imageData: ImageData[] = [];
    for (const image of images) {
        const buffer = await resize(image)  
        const name = await generateImgName()
        console.log(name)
        imageData.push({buffer,name})
    }

    // console.log(imageData)


    // save to AWS S3 bucket
    await postToS3bucket(imageData);

    // save to Mongo
    const data : PostData= {
        imageurls: imageData.map((img) => img.name),
        user: {
            connect: {
                id: user.id
            }
        }
    }

    await postData(data)
    return
}
