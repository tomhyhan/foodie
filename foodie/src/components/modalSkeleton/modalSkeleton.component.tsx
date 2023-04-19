import React, { ReactElement } from 'react'
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from 'react'

type ModalSkeltonProps = {
    open : boolean,
    closeModal: () => void
    children: ReactElement
}

export default function ModalSkeleton({open, closeModal, children} : ModalSkeltonProps) {
    return (
        <Transition appear show={open} as={Fragment}>
        {/* @ts-ignore */}
        <Dialog as="div" className="relative z-50" 
        onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-0"
            leaveTo="opacity-0"
          >
        <div className="fixed inset-0  bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mb-4 pb-2" >
                    {/* start of context */}
                    {children}
                  {/* end of context */}
                  </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> 
    )
}
