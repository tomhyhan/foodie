"use client";

import Link from 'next/link';
import React from 'react'
import useSWR from 'swr'

const fetcher = (url :string) => fetch(url).then((res) => res.json());

export default function Display() {
    // const {data} = useSWR("/api/image", fetcher)
    
    return (
        <div className='p-4 sm:ml-64'>Display
        <Link href={"/test"}>to go test page</Link></div>
    )
}
