import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { CgArrowRightO, CgArrowLeftO } from "react-icons/cg";
import { arrowStyles, indicatorStyles } from '@/styles/styles';
import { FilePreview } from '../upload.component';


type CarouselPrevComponentProps = {
  images: FilePreview[]
}

export default function CarouselPrevComponent({images} : CarouselPrevComponentProps) {
  return (
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
  )
};
