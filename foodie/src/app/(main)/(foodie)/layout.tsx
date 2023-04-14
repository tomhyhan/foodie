
import { PostData } from "@/lib/data/post";
import Image from "next/image";
import { getServerSession, Session } from 'next-auth';
import { getImages } from "@/lib/controllers/post.controller";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import logger from "pino";

// todos
// 1. complete server side pagination (15)
// 2. display images on foodie route
//      - from layout get 15 images SSR
//      - use client component to get more images 
//      - infinite scrolling
// 3. image model
//      - when image is clicked => takes user to modal
//      - route

// fix this
const logger1 = logger();

async function fetchImgUrls(session:Session): Promise<PostData[]> {
    const res = await getImages(session.user!.email!, 1);
    return res
 }
 //  w-full aspect-square mb-6 scale-50 animate-card-glow
 //  w-full aspect-video mb-6 scale-50 animate-card-glow

 
export default async function FoodieLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    const session= await getServerSession(authOptions)
    if (!session) {
        redirect('/login')
    }

    const posts = await fetchImgUrls(session)
    logger1.info("foodie layout")
    logger1.info(posts)

    return (
         <div className="p-4 sm:ml-64">
      {/* {posts.map((post) => 
      <div key={post.imageurls[0]}>
         <Image src={post.imageurls[0]} width={300} height={300} alt={"test"}></Image>
      </div>
      )} */}
     
     <div className="columns-2 md:columns-3 lg:columns-4">
        <div className="w-full aspect-video mb-6 scale-50 animate-card-glow">
              <Image className="h-auto rounded-lg " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-square mb-6 scale-50 animate-card-glow">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-video mb-6 scale-50  animate-card-glow">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-square mb-6  animate-card-glow">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-video mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" width="300" height="300" alt="" />
        </div >
        <div className="w-full aspect-square mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-video mb-6">
              <Image className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-square mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-video mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-square mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" width="300" height="300" alt="" />
        </div>
        <div className="w-full aspect-video mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" width="300" height="300" alt="" />
        </div >
        <div className="w-full aspect-square mb-6">
              <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" width="300" height="300" alt="" />
        </div>
  </div> 
  {children}
     </div>
     
  
    );
  }


