import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function findUser(user: any) {
    await prisma.$connect()
    // @ts-ignore
    await prisma.user.({email:user.email})
}