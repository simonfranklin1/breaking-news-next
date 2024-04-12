"use client"

import { NewsI } from '@/types/types'
import { findLatestPosts, findRatedPosts } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { LatestNews, Loading, RatedPosts, TopNews } from '.';
import SportsNews from './SportsNews';
import TopCreators from './TopCreators';

const Feed = () => {
    const [ posts, setPosts ] = useState<NewsI[] | null>(null);
    const [ rated, setRated ] = useState<NewsI[] | null>(null);
    const latestPost = posts ? posts[0] : null;

    useEffect(() => {
        findLatestPosts().then(response => setPosts(response));
        findRatedPosts().then((response) => {
            setRated(response.sort((a, b) => {
                if (a.likes.length > b.likes.length) {
                    return -1
                } else if (a.likes.length < b.likes.length) {
                    return 1
                } else {
                    return 0
                }
            }))
        });
    }, [])

  return (
    <div>
        {
            posts && rated && latestPost && (
                <div className="flex flex-col gap-12">
                    <TopNews post={latestPost} />
                    <LatestNews posts={posts.filter((post) => post !== latestPost)} />
                    <SportsNews posts={posts.filter((post) => post.category === "esporte" && post !== latestPost)} />
                    <RatedPosts posts={rated.filter((post) => post._id !== latestPost._id).filter((post) => post._id !== latestPost._id).slice(0, 4)} />
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