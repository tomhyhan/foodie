"use client";

import NavbarBtn from "@/components/navbarbtn.component";
import Image from "next/image";
import { useRouter } from "next/navigation";

import foodielogo from '../../public/foodie.png';
import { signOut } from 'next-auth/react';

import {CgProfile, CgAddR, CgLogOut, CgHome} from 'react-icons/cg';
import {AiOutlineSearch} from 'react-icons/ai';
import { useState } from "react";
import Upload, { FilePreview } from "./upload.component";
import Alarm from "./alarm/alarm.component";

export default function Navbar() {
    const router = useRouter();
    const [images, setImages] = useState<FilePreview[]>([]);
    let [isOpen, setIsOpen] = useState(false)
    const [openAlarm, setOpenAlarm] = useState(false)

    const handleOpenRemoveModal = () => {
        setOpenAlarm(true)
    }

    const handleDeleteRemoveModal = () => {
        setOpenAlarm(false)
    }


    const handleSetImages = (files :FilePreview[] ) => {
        setImages(files)
    }

    const handleDeleteImages = () => {
        setImages(() => {
            setIsOpen(false)
            return []
        })
    }

    const handleHomeClick = () => {
        router.push("/")
    }

    const handleProfileClick = () => {
        router.push("/profile")
    }

    const handleSearchClick = () => {
    console.log("search clicked")
    }
    
    const handleSignout = async () => {
        await signOut({ redirect: false})
        router.push("/")
    }

    const closeModal = () => {
        if (images.length > 0) {
            setOpenAlarm(true)
            return
        }
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
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
               <NavbarBtn title={"Share"} onClick={openModal} icon={CgAddR}></NavbarBtn>
            </li>
            <li>
               <NavbarBtn title={"log out"} onClick={handleSignout} icon={CgLogOut}></NavbarBtn>
            </li>
         </ul>
      </div>
      <Upload 
        isOpen={isOpen} 
        closeModal={closeModal} 
        images={images}
        onSetImages={handleSetImages}
        onDeleteimages={handleDeleteImages}
        openAlarm={handleOpenRemoveModal}
        />
        <Alarm 
        openAlarm={openAlarm}
        onClickOpen={handleOpenRemoveModal}
        onClickClose={handleDeleteRemoveModal}
        onDeleteImages={handleDeleteImages}/>
   </aside>
  )
}

// CgProfile, CgAddR, CgLogOut