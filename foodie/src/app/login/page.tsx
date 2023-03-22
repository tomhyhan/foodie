
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Login from '../../components/login.component';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import foodpic from "../../../public/food.jpg";
import foodiepic from "../../../public/foodie.png";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/")
  }

  return (
        // <>
        //   Not signed in <br />
        //   <Login></Login>

          <section className="h-screen">
            <div className="container h-full px-6 py-24 flex justify-center">
              <div
                className="g-6 flex h-full flex-wrap items-center justify-center ">
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 flex justify-center">
                  <Image
                    // src="/food.jpg"
                    src={foodpic}
                    // className="w-full"
                    className="w-3/4 h-3/4 rounded-2xl"
                    style={{maxHeight:"1080px", maxWidth:"670px"}}
                    alt="Phone image" />
                </div>
                <div className="md:w-8/12 lg:w-5/12 mb-20 ml-0">
                  <div className='mb-20'>
                  <div className="w-full">
                    <Image
                    src={foodiepic}
                    className="ml-auto mr-auto"
                    alt="Food image" />
                  </div>
                    <h1 className="text-center mb-5 text-neutral-600 font-extrabold text-xl">Sign up to start Sharing.</h1>
                    <Login></Login>
                  </div>
                </div>
              </div>
            </div>
          </section>
      )
}
