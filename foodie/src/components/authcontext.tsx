"use client";

import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function AuthContext({children} : {children: React.ReactNode, session: String}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
