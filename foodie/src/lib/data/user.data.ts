import { PrismaClient } from '@prisma/client'
import { cache } from 'react'; 
import { prisma } from './prisma';

export const findUser =  cache(async(email: string) =>  {
    const user = await prisma.user.findUnique({ where: {
        email
      },})
    return user
})