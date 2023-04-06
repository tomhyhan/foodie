
import React, { Component, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { CgArrowRightO, CgArrowLeftO } from "react-icons/cg";
import { FilePreview } from './upload.component';
import { FcNext } from "react-icons/fc";
import { useState } from 'react';
import { getBaseUrl } from '@/lib/utils/getBaseUrl';
import { useRouter } from 'next/navigation';

const arrowStyles : CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
};

const indicatorStyles: CSSProperties = {
    background: 'gray',
    opacity:0.8,
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 4px',
    borderRadius: "50%"
};

type ImgSlideProps = {
    images: FilePreview[]
}

export default function ImgSlide({images}:ImgSlideProps) {
    const router = useRouter();
    const [next, setNext] = useState(true);

    const handleNextClick = () => {
        setNext(prev=>!prev)
    }
    const handleImgSubmit = async () => {
        let formData = new FormData();
        for (const image of images) {
            formData.append("images", image)
        }

        await fetch(`${getBaseUrl()}/api/image`, {
            method:"POST",
            body: formData,
        });

        router.push("/");
    }

    return (
        <div className="flex">
            <div>
            <Carousel showThumbs={false} 
            renderArrowNext={(onClickHandler: () => void, hasNext: boolean, label: string) =>
                hasNext && (
                    <CgArrowRightO className="hover:opacity-50 text-stone-600" onClick={onClickHandler} style={{ ...arrowStyles, right: 15 }}></CgArrowRightO>
                )}
            renderArrowPrev={(onClickHandler: () => void, hasNext: boolean, label: string) =>
                hasNext && (
                    <CgArrowLeftO className="hover:opacity-50 text-stone-600" onClick={onClickHandler} style={{ ...arrowStyles, left: 15 }}></CgArrowLeftO>
                    )}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                    return (
                        <li
                            style={{ ...indicatorStyles, backgroundColor:"rgb(56 189 248)"}}
                            aria-label={`Selected: ${label} ${index + 1}`}
                            title={`Selected: ${label} ${index + 1}`}
                        />
                    );
                }
                return (
                    <li
                        style={indicatorStyles}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        value={index}
                        key={index}
                        role="button"
                        tabIndex={0}
                        title={`${label} ${index + 1}`}
                        aria-label={`${label} ${index + 1}`}
                    />
                );
            }}
                >
                {images.map(image => 
                    <div className="w-full h-full relative" key={image.name + Math.random()}>
                        <Image className="w-full h-full" style={{maxHeight: "40rem", minHeight: "300px", minWidth: "50px"}} src={image.preview} alt='image.name' width={500} height={500}></Image>
                    </div>
                )}
            </Carousel>
            {next? <div className="w-full  m-0 mt-3 font-bold text-sky-600">
                <span onClick={handleNextClick}className="cursor-pointer flex justify-end items-center">Next <FcNext /></span>
            </div>: <></>}                                                  
            </div>
            <div style={{
                visibility: next? "hidden": "visible",
                width: next? "0": "100%",
                transition: "all 0.300s ease"
            }} className="mx-7 my-10">
                {/* Description */}
                <div className="mb-3 w-40 text-sm">
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
