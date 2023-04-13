"use client";

import React from 'react'
import { ToastContainer } from 'react-toastify';

export default function Toastify() {
  return <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  theme="light"
  style={{ position: "fixed" }}
  /> 
}
