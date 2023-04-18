
import React, { useTransition } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-toastify/dist/ReactToastify.css";
import { FilePreview } from './upload.component';
import { FcNext } from "react-icons/fc";
import { useState } from 'react';
import { getBaseUrl } from '@/lib/utils/getBaseUrl';
import { useRouter } from 'next/navigation';
import {clientPost} from '../lib/network/networkClient';
import { ThreeDots } from 'react-loader-spinner';
import CarouselComponent from './carousel/carousel.component';

type ImgSlideProps = {
    images: FilePreview[]
    closeModal: () => void
    onClickDeleteImages: () => void
    notify: () => void
}

export default function ImgSlide({images, closeModal, onClickDeleteImages, notify}:ImgSlideProps) {
    const router = useRouter();
    const [next, setNext] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    
    const isMutating = isFetching || isPending;

    const handleNextClick = () => {
        setNext(prev=>!prev)
    }
    const handleImgSubmit = async () => {
        let formData = new FormData();
        for (const image of images) {
            formData.append("images", image)
        }
        setIsFetching(true)
        try {
            await clientPost("/api/image", {
                method:"POST",
                body: formData,
            })
            setIsFetching(false)
        } catch (err) {
            notify()
        }
        
        closeModal()
        onClickDeleteImages()
        handleNextClick()

        startTransition(() => {
            router.refresh();
        });
    }
    if (isMutating) {
        return <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#38bdf8" 
        ariaLabel="three-dots-loading"
        visible={true}
        wrapperClass="flex justify-center"
         />
    }
 
    return (
        <div className="flex mb-5">
            <div className='w-full'>
            <CarouselComponent images={images} />
            {next? <div className="w-full  m-0 mt-3 font-bold text-sky-600">
                <span onClick={handleNextClick}className="cursor-pointer flex justify-end items-center">Next <FcNext /></span>
            </div>: <></>}                                                  
            </div>
            <div style={{
                visibility: next? "hidden": "visible",
                width: next? "0": "100%",
                margin: next? "0": "0 0.7rem 0.7rem 0.7rem",
                transition: "all 0.300s ease"
            }} className="">
                {/* Description */}
                <div className="mb-3 w-100 text-sm">
                    <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea rows={3} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" />
                </div>
                {/* location */}
                <div className="mb-3">
                    <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" />
                </div>
                {/* rating */}
                <div>
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
 
                </div>
                {/* submit */}
                <div className="w-full font-bold text-sky-600 absolute right-5 bottom-5">
                    <span onClick={handleImgSubmit}className="cursor-pointer flex justify-end items-center">Share!<FcNext /></span>
                </div>
            </div>
        </div>
        
    );
}
