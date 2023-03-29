import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import { FcUpload } from "react-icons/fc";

type UnloadUiProps = {
    getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T,
    getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
}
export default function UploadUi({getRootProps, getInputProps}: UnloadUiProps) {
  return (
    <>
        <Dialog.Title
        as="h3"
        // @ts-ignore
        className="text-lg font-medium leading-6 text-gray-700 text-center mb-5"
        >
        Share Foodie!
        </Dialog.Title>
    <div {...getRootProps({className:"flex items-center justify-center w-full border-0 outline-0	"})}>
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FcUpload className="w-10 h-7 mb-3 text-gray-400"></FcUpload>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <input  {...getInputProps({className:"hidden"})}/>
        </label>
    </div> 
  </>
    )
}
