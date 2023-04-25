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
            skip: 12 + (page - 1) * 3,
            take: 3,
        })
        return posts
    } catch (err) {
        throw err
    }
}

export async function getPostDataById(hashed_id: string) : Promise<PostData|null> {
    try {
        const post = await prisma.post.findUnique({
            where: {hashed_id},
        })
        return post
    } catch (err) {
        throw err
    }
}

export async function getFirstPostData(email : string, page: number) : Promise<PostData[]|null> {
    try {
        const posts = await prisma.post.findMany({
            where: {user:{email}},
            orderBy: {
                createdAt: "desc"
            },
            take: 12,
    
        })
        return posts
    } catch (err) {
        throw err
    }
}

export async function deletePostById(id: string) {
    try {
        await prisma.post.delete({
            where: {id}
        })
    } catch (err) {
        throw err
    }
}

