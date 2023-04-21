"use client";

import React from 'react'
import ModalSkeleton from "@/components/modalSkeleton/modalSkeleton.component";
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from 'react'
import { PostData } from '@/lib/data/post';

type PostProps = {
    post: PostData
}

export default function Post({post}: PostProps) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)

    const handleCloseModal = () => {
        setOpen(false)
    }
    
  return (
    <ModalSkeleton open={open} closeModal={handleCloseModal} >
        <>
        <div>{post.hashed_id}</div>
        </>
    </ModalSkeleton>
  )
}
