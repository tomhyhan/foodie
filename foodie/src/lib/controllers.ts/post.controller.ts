import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { IFile, PostData } from "../data/post.data";
import { postData } from "../data/posts.data";
import { generateImgName } from "../utils/imgName";
import { resize } from "../utils/resizeImg";

export async function postImages(images: IFile[],) {


    // resize images
    const imageData: { buffer: Buffer; name: String; }[] = [];
    images.forEach(async (image) => {
        const buffer = await resize(image)  
        const name = await generateImgName()
        imageData.push({buffer,name})
    })
    console.log(imageData)
    const imageUrls: string[] = []


    // save to AWS S3 bucket

    // save to Mongo
    const data : PostData= {
        imageurls: images.map((img) => img.fieldname),
    }

    await postData(data)
    return
}