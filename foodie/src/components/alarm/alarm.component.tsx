import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from 'react'
import ModalSkeleton from "../modalSkeleton/modalSkeleton.component"
  
type AlarmProps = {
    openAlarm: boolean,
    onClickClose: () => void,
    onDeleteImages: () => void
}

export default function Alarm({openAlarm, onClickClose, onDeleteImages} : AlarmProps) {    
    const handleDeleteImages = () => {
        onDeleteImages()
        onClickClose()
    }

    return (
            <ModalSkeleton open={openAlarm} closeModal={onClickClose}>
                <>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        {/* @ts-ignore */}
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Remove Images
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to remove all your files? 
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteImages}
                    >
                    Remove
                    </button>
                    <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClickClose}
                    >
                    Cancel
                    </button>
                </div>
                </>
            </ModalSkeleton>
              
              
  )
}
