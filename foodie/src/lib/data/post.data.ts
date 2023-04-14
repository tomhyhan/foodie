import { PostData } from "./post";
import { prisma } from "../../../db/prisma";
import { findUser } from "./user.data";


export async function postData(data : PostData) {
    // @ts-ignore
    await prisma.post.create({data})
}

export async function getPostData(email : string, page: number) : Promise<PostData[]|null> {
    try {
        const posts = await prisma.post.findMany({
            where: {user:{email}},
            orderBy: {
                createdAt: "desc"
            },
            skip: (page - 1) * 15,
            take: 15,
    
        })
        return posts
    } catch (err) {
        throw err
    }
}
