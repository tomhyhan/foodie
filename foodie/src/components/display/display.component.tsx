"use client";

// import logger from '@/logger/logger';
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useRef, useState, useCallback} from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import useFetcherHook from '../fetcherhook/fetcherhook.component';


export default function Display() {
    const observer = useRef<IntersectionObserver | null>(null);
    const [page, setPage] = useState<number>(0);
    const {posts, isLoading, isError, reachEnd} = useFetcherHook(page)  
    const bottomRef = useRef<HTMLDivElement|null>(null)

    const handleItersection = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting ) {
            if (!reachEnd && !isLoading) {
                setPage((prev)=> prev+1);
            }
        }
    }, [isLoading, reachEnd])
    

    useEffect(() => {
        const options = {
            root: null,
            threshold: 0
        }
        observer.current = new IntersectionObserver(handleItersection, options)
        const scrollTrigger = document.getElementById("scroll-trigger");
        observer.current.observe(scrollTrigger!);

        return () => {
            observer.current?.disconnect()
        }
    },[handleItersection])

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", inline: "end", block: "end" })
    }

    useEffect(() => {
        if (posts.length > 0) {
            scrollToBottom()
        }
    },[isLoading])

    // Error **
    if (isError) {
        console.log("error")
        console.log(isError)
    }

    return (
        <>
            {posts.map((post) => {
                return (
                    <Link key={post.id} className="h-72 scale-50 animate-card-glow" href={"/test"}>
                        <Image key={post.imageurls[0]} className="rounded-lg w-full h-full" src={post.imageurls[0]} width={100} height={100} alt="food image" />
                    </Link>
                    )
                }
                )}
            
            {isLoading && <div ref={bottomRef} className="w-full flex justify-center col-span-2 md:col-span-3">
                <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="#38bdf8" 
                ariaLabel="three-dots-loading"
                visible={true}
                wrapperClass=""
                />
                </div>
            }                
        </> 
    )
}

{/* <Link href={"/test"}>to go test page</Link> */}

