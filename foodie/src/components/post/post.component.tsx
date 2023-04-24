"use client";

import React from 'react'
import ModalSkeleton from "@/components/modalSkeleton/modalSkeleton.component";
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from 'react'
import { PostData } from '@/lib/data/post';
import { useRouter } from 'next/navigation';
import CarouselComponent from '../carousel/carousel.component';


type PostProps = {
    post: PostData
}

export default function Post({post}: PostProps) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const router = useRouter()

    const handleCloseModal = () => {
        setOpen(false)
        router.push("/")
    }
    
  return (
    <ModalSkeleton open={open} closeModal={handleCloseModal} >
        <>
        <CarouselComponent post={post} />
        </>
    </ModalSkeleton>
  )
}
