"use client";
import Link from 'next/link';
import React, {useEffect, useRef} from 'react'
import useSWR from 'swr'

const fetcher = (url :string) => fetch(url).then((res) => res.json());

export default function Display() {
    const observer = useRef<IntersectionObserver | null>(null);

    // const {data} = useSWR("/api/image", fetcher)
    const handleItersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            console.log("intersecting")
        }
    }
    useEffect(() => {
        const options = {
            root: null,
            threshold: 0.9
        }
        observer.current = new IntersectionObserver(handleItersection, options)
        const scrollTrigger = document.getElementById("scroll-trigger");
        observer.current.observe(scrollTrigger!);

        return () => {
            observer.current?.disconnect()
        }
    },[handleItersection])


    return (
        <div  className='p-4 sm:ml-64 h-96'>Display
        {/* <div className="h-96"></div> */}
            {/* 
            <div className="h-96"></div>
            <div className="h-96"></div> */}
        </div>
    )
}

{/* <Link href={"/test"}>to go test page</Link> */}