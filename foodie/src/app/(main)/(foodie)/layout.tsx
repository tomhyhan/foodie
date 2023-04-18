
import { PostData } from "@/lib/data/post";
import Image from "next/image";
import { getServerSession, Session } from 'next-auth';
import { getImages, getServersideImages } from "@/lib/controllers/post.controller";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import logger from "@/logger/logger";
import Masonry from 'react-masonry-css'
import Display from "@/components/display/display.component";
import Link from "next/link";

// todos
// 1. complete server side pagination (15)
// 2. display images on foodie route
//      - from layout get 15 images SSR
//      - use client component to get more images 
//      - infinite scrolling
// 3. image model
//      - when image is clicked => takes user to modal
//      - route

async function fetchImgUrls(session:Session): Promise<PostData[]> {
    const res = await getServersideImages(session.user!.email!, 1);
    return res
 }

// // scale-50 animate-card-glow
// const posts = [
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
//       {
//              imageurls: ["https://picsum.photos/200/300"]
//       },
// ]
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

    const posts = await fetchImgUrls(session)

    return (
         <div className="p-4 sm:ml-64">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 justify-between"  >
                {posts.map((post) => 
                    {
                        return (
                            <Link key={post.id} className="h-72" href={`/${post.id}`}>
                                <Image className="rounded-lg w-full h-full" src={post.imageurls[0]} width={100} height={100} alt="food image" />
                            </Link>
                            )
                        }
                    )}    
                {posts.length == 12? <Display />: <></>}
            </div>
            {children}
            <div className="w-full" id="scroll-trigger" />
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