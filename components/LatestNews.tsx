"use client"

import { findLatestPosts } from '@/utils/utils';
import { PostList } from '.';
import { useEffect, useState } from 'react';
import { NewsI } from '@/types/types';

const LatestNews = () => {
    const [posts, setPosts] = useState<NewsI[] | null>(null);

    useEffect(() => {
        findLatestPosts().then(response => setPosts(response))
    }, []);

    return (
        <>
            { posts && <PostList posts={posts.slice(0, 4)} link={"/posts"} title="Últimas notícias" />}
        </>
    )
}

export default LatestNews