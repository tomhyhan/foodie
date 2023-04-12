import { PostData } from "./post";
import { prisma } from "./prisma";
import { findUser } from "./user.data";


export async function postData(data : PostData) {
    // @ts-ignore
    await prisma.post.create({data})
}

export async function getPostData(email : string) : Promise<PostData[]|null> {
    const user = await prisma.user.findUnique({
        where : {email},
        include: {
            posts: true,
          },
    },
    )
    if (!user) {
        return null
    }
    console.log("user data")
    console.log(user.posts)
    return user.posts
}
