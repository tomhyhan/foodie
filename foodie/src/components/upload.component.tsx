import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import {useDropzone} from 'react-dropzone';
import ImgSlide from './imgslide.component';
import UploadUi from './uploadui.component';
import { ToastContainer, toast } from 'react-toastify';
import ModalSkeleton from './modalSkeleton/modalSkeleton.component';

type UploadProps = {
    isOpen: boolean,
    closeModal: () => void,
    images: FilePreview[],
    onSetImages: (files: FilePreview[]) => void
    onDeleteimages: () => void
    openAlarm: () => void
}

export interface FilePreview extends File {
  preview: string
}

export default function Upload({isOpen, closeModal, images, onSetImages, openAlarm, onDeleteimages}: UploadProps) {
    const handleDeleteImages = () => {
        onDeleteimages()
    }

    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        onSetImages(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      },
      multiple: true
    });

    const notify = () => {
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
  return (
    <>
        <ModalSkeleton open={isOpen} closeModal={closeModal}>
            <>
                { images.length > 0 ? 
                    <ImgSlide images={images} closeModal={closeModal} onClickDeleteImages={handleDeleteImages} notify={notify} openAlarm={openAlarm}></ImgSlide>
                    : 
                    <UploadUi getRootProps={getRootProps}
                    getInputProps={getInputProps}></UploadUi>
                }
            </>
        </ModalSkeleton>
                
    </>
  )
}


{/* <button
type="button"
className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
onClick={closeModal}
>
Got it, thanks!
</button> */}