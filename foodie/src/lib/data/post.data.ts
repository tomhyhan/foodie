import { PostData } from "./post";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function postData(data : PostData) {
    await prisma.$connect()
    // @ts-ignore
    await prisma.post.create({data})
}