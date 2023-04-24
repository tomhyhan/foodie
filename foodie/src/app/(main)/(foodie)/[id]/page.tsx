import ModalSkeleton from "@/components/modalSkeleton/modalSkeleton.component";
import Post from "@/components/post/post.component";
import { getPostById } from "@/lib/controllers/post.controller";
import logger from "@/logger/logger";

type PageProps = {
    params: {
        id:string
    }
}
  
async function fetchPost(id: string) {
    try{
        const post = await getPostById(id)
        if (!post) {
            throw new Error('Post not found.');
        }
        return post
    } catch (err) {
        logger.error(err)
        throw err
    }
} 

export default async function Page({params}:PageProps) {
    const {id} = params
    const post = await fetchPost(id)
    
    return (
        <Post post={post} />
  )
}
