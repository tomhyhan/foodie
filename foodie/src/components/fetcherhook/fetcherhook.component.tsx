import { PostData } from '@/lib/data/post';
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';

export default function useFetcherHook(page: number) {
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
        if (page != 0) {
            query()
        }
    },[page,query])

    return {posts, isLoading, isError, reachEnd}
}