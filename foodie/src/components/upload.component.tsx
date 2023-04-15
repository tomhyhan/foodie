import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import {useDropzone} from 'react-dropzone';
import ImgSlide from './imgslide.component';
import UploadUi from './uploadui.component';
import { ToastContainer, toast } from 'react-toastify';

type UploadProps = {
    isOpen: boolean,
    closeModal: () => void
}

export interface FilePreview extends File {
  preview: string
}

export default function Upload({isOpen, closeModal}: UploadProps) {
    const [images, setImages] = useState<FilePreview[]>([]);

    const handleDeleteImages = () => {
      setImages([])
    }

    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setImages(acceptedFiles.map(file => Object.assign(file, {
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
      <Transition appear show={isOpen} as={Fragment}>
        {/* @ts-ignore */}
        <Dialog as="div" className="relative z-50" 
        onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
        <div className="fixed inset-0  bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mb-0 pb-0" >
                { images.length > 0 ? 
                  <ImgSlide images={images} closeModal={closeModal} onClickDeleteImages={handleDeleteImages} notify={notify}></ImgSlide>
                  : 
                  <UploadUi getRootProps={getRootProps}
                  getInputProps={getInputProps}></UploadUi>
                }
                  {/* <div className="mt-4">

                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>      
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