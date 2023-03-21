"use client";

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function AuthContext({children} : {children: React.ReactNode}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
