"use client"

import { NewsI } from '@/types/types'
import { findLatestPosts, findRatedPosts } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { LatestNews, Loading, RatedPosts, TopNews } from '.';
import SportsNews from './SportsNews';

const Feed = () => {
    const [ posts, setPosts ] = useState<NewsI[] | null>(null);
    const [ rated, setRated ] = useState<NewsI[] | null>(null);

    useEffect(() => {
        findLatestPosts().then(response => setPosts(response));
        findRatedPosts().then(response => setRated(response));
    }, [])

  return (
    <div>
        {
            posts && rated && (
                <div className="flex flex-col gap-12">
                    <TopNews post={posts[0]} />
                    <LatestNews posts={posts.filter((post) => post !== posts[0])} />
                    <SportsNews posts={posts.filter((post) => post.category === "esporte" && post !== posts[0])} />
                    <RatedPosts posts={rated.filter((post) => post !== posts[0]).slice(0, 4)} />
                </div>
            ) || (
                <Loading />
            )
        }
    </div>
  )
}

export default Feed