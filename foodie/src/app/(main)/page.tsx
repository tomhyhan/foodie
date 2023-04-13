import { getServerSession, Session } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import { getBaseUrl } from '@/lib/utils/getBaseUrl';
import { getImages } from '@/lib/controllers/post.controller';
import Image from 'next/image';
import { PostData } from '@/lib/data/post';

async function fetchImgUrls(session:Session): Promise<PostData[]> {
   const res = await getImages(session.user!.email!);
   return res
}

export default async function Page() {
   const session= await getServerSession(authOptions)
   
   if (!session) {
      redirect('/login')
   }
   // const posts = await fetchImgUrls(session);

   return (
   <>
   <div className="p-4 sm:ml-64">
      {/* {posts.map((post) => 
      <div key={post.imageurls[0]}>
         <Image src={post.imageurls[0]} width={300} height={300} alt={"test"}></Image>
      </div>
      )} */}

      <div className="columns-3 test">
            <div className="w-full aspect-video mb-6 animate">
                  <Image className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" width="300" height="300" alt="" />
            </div>
            <div className="w-full aspect-square mb-6 animate">
                  <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" width="300" height="300" alt="" />
            </div>
            <div className="w-full aspect-video mb-6 animate">
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

   </div>

   </>)
}


{/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
         <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
         </div>
         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
         </div>
         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
               <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
         </div>
      </div> */}

