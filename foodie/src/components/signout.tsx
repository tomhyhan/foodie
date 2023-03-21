"use client";

import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Signout() {
    const {data:session} = useSession()

    console.log("signout")
    console.log(session)
    
  return (
    <button onClick={() => signOut()} >Sign out</button>
  )
}
