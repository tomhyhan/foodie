import Navbar from "@/components/navbar";
import Toastify from "@/components/toastify/toastify.component";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ToastContainer } from 'react-toastify';

export default async function HomeLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
      const session= await getServerSession(authOptions)
   
      if (!session) {
         redirect('/login')
      }

    return (
      <section>
        <Navbar></Navbar>
          {children}
        <Toastify />
      </section>
    );
  }


