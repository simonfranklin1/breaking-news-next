"use client"

import { NewsI } from '@/types/types'
import { findLatestPosts } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { LatestNews, Loading, RatedPosts, TopNews } from '.';
import SportsNews from './SportsNews';
import TopCreators from './TopCreators';

const Feed = () => {
    const [ posts, setPosts ] = useState<NewsI[] | null>(null);
    const rated = posts ? posts.sort((a, b) => a.likes.length + b.likes.length) : null;
    const latestPost = posts ? posts[0] : null;

    useEffect(() => {
        findLatestPosts().then(response => setPosts(response));
    }, [])

  return (
    <div>
        {
            posts && rated && latestPost && (
                <div className="flex flex-col gap-12">
                    <TopNews post={latestPost} />
                    <LatestNews posts={posts.filter((post) => post !== latestPost)} />
                    <SportsNews posts={posts.filter((post) => post.category === "esporte" && post !== latestPost)} />
                    <RatedPosts posts={rated.filter((post) => post._id !== latestPost._id).slice(0, 4)} />
                    <TopCreators />
                </div>
            ) || (
                <Loading />
            )
        }
    </div>
  )
}

export default Feed