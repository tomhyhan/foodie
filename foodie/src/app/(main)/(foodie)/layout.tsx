
import { PostData } from "@/lib/data/post";
import Image from "next/image";
import { getServerSession, Session } from 'next-auth';
import { getImages } from "@/lib/controllers/post.controller";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import logger from "@/logger/logger";
import Masonry from 'react-masonry-css'
import Display from "@/components/display/display.component";

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

function getRandomHeight(min: number, max:number) {
      const result =  Math.random() * (max - min) + min
      logger.info(`height = ${Math.floor(result)}`)
      return Math.floor(result) 
}


// async function fetchImgUrls(session:Session): Promise<PostData[]> {
//     const res = await getImages(session.user!.email!, 1);
//     return res
//  }
// // scale-50 animate-card-glow
const posts = [
      {
             imageurls: ["https://picsum.photos/200/300"]
      },
      {
             imageurls: ["https://picsum.photos/200/300"]
      },
      {
             imageurls: ["https://picsum.photos/200/300"]
      },
      {
             imageurls: ["https://picsum.photos/200/300"]
      },
      {
             imageurls: ["https://picsum.photos/200/300"]
      },
      {
             imageurls: ["https://picsum.photos/200/300"]
      },
]
const oddClassName = "w-full  mb-6"
const evenClassName = "w-full  mb-6"
 
export default async function FoodieLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    const session= await getServerSession(authOptions)
    if (!session) {
        redirect('/login')
    }

//     const posts = await fetchImgUrls(session)
//     logger.info("foodie layout")
//     logger.info(posts)

    return (
         <div className="p-4 sm:ml-64">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-between" id="scroll-trigger" >
                {posts.map((post, idx) => 
                    {
                        logger.info(post)
                        return (
                            <div className="h-72" >
                                <Image key={post.imageurls[0]} className="rounded-lg w-full h-full" src={post.imageurls[0]} width={100} height={100} alt="food image"></Image>
                            </div>
                            )
                    }
                    )}    
            <Display />
            </div>
            <div ></div>
            {children}
      </div>
     
  
    );
  }


//   <div key={post.imageurls[0]} className="flex-shrink flex-grow-0 w-56" style={{height: `${getRandomHeight(150, 550)}px`, lineHeight:`${getRandomHeight(150, 550)}px`}}>
//   </div>

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };