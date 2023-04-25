"use client";

import React from 'react'
import ModalSkeleton from "@/components/modalSkeleton/modalSkeleton.component";
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from 'react'
import { PostData } from '@/lib/data/post';
import { useRouter } from 'next/navigation';
import CarouselComponent from '../carousel/carousel.component';
import { FcRemoveImage } from 'react-icons/fc';
import Alarm from '../alarm/alarm.component';
import { clientPost } from '@/lib/network/networkClient';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';


type PostProps = {
    post: PostData
}

export default function Post({post}: PostProps) {
    const [open, setOpen] = useState(true)
    const [alarm, setAlarm] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleCloseModal = () => {
        setOpen(false)
        router.push("/")
    }

    const handleDeletePost = async () => {
        setLoading(true)
        try {
            await clientPost("/api/image", {method: "DELETE",headers: {
                'Content-Type': 'application/json'
              }, 
              body: JSON.stringify({id: post.id})})
        } catch (err) {
            console.log(err)
            toast.error('Oops! Something went wrong. Please try again', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        setLoading(false)
    }
    
    const openAlarm = () => {
        setAlarm(true)
    }

    const handleCloseAlarm = () => {
        setAlarm(false)
    }
    
    return (
    <ModalSkeleton open={open} closeModal={handleCloseModal} >

        {loading
        ? <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#38bdf8" 
        ariaLabel="three-dots-loading"
        visible={true}
        wrapperClass="flex justify-center"
         />
        : <div className="w-full mt-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="absolute top-2 right-5 text-2xl">
                <FcRemoveImage onClick={openAlarm} className="cursor-pointer"/>
            </div>
            <a href="#">
                <CarouselComponent post={post} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
            <Alarm onClickClose={handleCloseAlarm} openAlarm={alarm} onDeleteImages={handleDeletePost}/>
        </div>}
    </ModalSkeleton>
  )
}
