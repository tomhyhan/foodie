import { PrismaClient } from '@prisma/client'
import { cache } from 'react'; 

const prisma = new PrismaClient()


export const findUser =  cache(async(email: string) =>  {
    await prisma.$connect()
    const user = await prisma.user.findUnique({ where: {
        email
      },})
    return user
})