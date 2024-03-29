
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
import { FcStackOfPhotos } from "react-icons/fc";

async function fetchImgUrls(session:Session): Promise<PostData[]> {
    const res = await getServersideImages(session.user!.email!, 1);
    return res
 }

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
            {posts.length > 0 ? <> 
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 justify-between"  >
                {posts.map((post, idx) =><>{idx==1? <Link key={post.hashed_id} className="h-72 relative" href={`/${post.hashed_id}`}>
                                <Image className="rounded-lg w-full h-full" src={post.imageurls[0]} width={100} height={100} alt="food image" />
                                <div className="flex hover:opacity-30 opacity-0 absolute top-0 bottom-0 left-0 right-0 bg-black text-white justify-center items-center">rating</div>
                            </Link>:<div></div>}</>)}  
                    {/* {posts.length == 12? <Display />: <></>} */}
                </div>
            {children}
            <div className="w-full" id="scroll-trigger" />
            </> :
            <div className="h-screen w-full">
                <div className="flex h-2/3 justify-center items-center text-2xl flex-col gap-6">
                    <FcStackOfPhotos className="text-5xl"/> 
                    <p>Post to Share your favorite Foodie moment</p>
                </div>
            </div>}
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


{/* <Link key={post.id} className="h-72" href={`/${post.id}`}>
                                <Image className="rounded-lg w-full h-full" src={post.imageurls[0]} width={100} height={100} alt="food image" />
                                
                            </Link> */}