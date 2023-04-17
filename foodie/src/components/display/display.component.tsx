"use client";
import { PostData } from '@/lib/data/post';
import { fetcher } from '@/lib/network/networkClient';
// import logger from '@/logger/logger';
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useRef, useState, useCallback} from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function fetcherHook(page: number) {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState<any>(null);
    const [reachEnd, setReachEnd] = useState<boolean>(false)

    const query = useCallback(async () => {
        try {
            if (reachEnd) {
                return
            }
            setLoading(true)
            setError(null)
            let res = await fetch(`/api/image?page=${page}`)
            let new_posts = await res.json()
            if (new_posts.length != 0) {
                setPosts((post) => [...post, ...new_posts]); 
            } else {
                setReachEnd(true)
            }
            setLoading(false)
        } catch (err){
            setError(err)
        }},[page])
    useEffect(() => {
        if (page != 1) {
            query()
        }
    },[page,query])

    return {posts, isLoading, isError, reachEnd}
}
export default function Display() {
    const observer = useRef<IntersectionObserver | null>(null);
    const [page, setPage] = useState<number>(1);
    const {posts, isLoading, isError, reachEnd} = fetcherHook(page)  

    const handleItersection = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting ) {
            setPage((prev)=> prev+1);
        }
    }, [])
    

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

    // Error **
    if (!isError) {
        console.log("error")
    }

    return (
        <>
            {posts.map((post, idx) => {
                return (
                    <Link key={post.imageurls[0]} className="h-72" href={"/test"}>
                        <Image key={post.imageurls[0]} className="rounded-lg w-full h-full" src={post.imageurls[0]} width={100} height={100} alt="food image" />
                    </Link>
                    )
                }
            )}
            
            {isLoading && <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="#38bdf8" 
                ariaLabel="three-dots-loading"
                visible={true}
                wrapperClass="w-full flex justify-center col-span-2 md:col-span-3 lg:col-span-4"
                />}
        </> 
    )
}

{/* <Link href={"/test"}>to go test page</Link> */}

