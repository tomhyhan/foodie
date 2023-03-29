"use client";

import NavbarBtn from "@/components/navbarbtn.component";
import Image from "next/image";
import { useRouter } from "next/navigation";

import foodielogo from '../../public/foodie.png';
import { signOut } from 'next-auth/react';

import {CgProfile, CgAddR, CgLogOut, CgHome} from 'react-icons/cg';
import {AiOutlineSearch} from 'react-icons/ai';

export default function Navbar() {
   const router = useRouter();

   const handleHomeClick = () => {
      router.push("/")
   }

   const handleProfileClick = () => {
      console.log("clicked")
      router.push("/profile")
   }

   const handleSearchClick = () => {
   console.log("search clicked")
   }

   const handleShareClick = () => {
   console.log("search share")
   }
   
   const handleSignout = () => {
      signOut()
   }

   
  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
         <div className="flex items-center  justify-center ">
            <Image src={foodielogo} className="w-8/12 sm:w-8/12 cursor-pointer" alt="Foodie Logo"  onClick={handleHomeClick}/>
         </div>
         <ul className="space-y-2">
            <li>
               <NavbarBtn title={"Home"} onClick={handleHomeClick} icon={CgHome}></NavbarBtn>
            </li>
            <li>
               <NavbarBtn title={"Search"} onClick={handleSearchClick} icon={AiOutlineSearch}></NavbarBtn>
            </li>
            <li>
               <NavbarBtn title={"Profile"} onClick={handleProfileClick} icon={CgProfile}></NavbarBtn>
            </li>
            <li>
               <NavbarBtn title={"Share"} onClick={handleShareClick} icon={CgAddR}></NavbarBtn>
            </li>
            <li>
               <NavbarBtn title={"log out"} onClick={handleSignout} icon={CgLogOut}></NavbarBtn>
            </li>
         </ul>
      </div>
   </aside>
  )
}

// CgProfile, CgAddR, CgLogOut