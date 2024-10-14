import { NewsI } from '@/types/types'
import { findLatestPosts, findRatedPosts } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { LatestNews, Loading, RatedPosts, TopNews } from '.';
import SportsNews from './SportsNews';
import TopCreators from './TopCreators';

const Feed = async() => {
    const posts: NewsI[] = await findLatestPosts().then((response) => response);
    const rated: NewsI[]  = await findRatedPosts().then((response) => response);
    const latestPost: NewsI | null = posts ? posts[0] : null;

  return (
    <>
        {
            posts && rated && latestPost && (
                <div className="flex flex-col gap-12">
                    <TopNews post={latestPost} />
                    <LatestNews posts={posts?.filter((post) => post !== latestPost)} />
                    <SportsNews posts={posts?.filter((post) => post.category === "esporte" && post !== latestPost)} />
                    <RatedPosts posts={rated?.filter((post) => post._id !== latestPost._id).filter((post) => post._id !== latestPost._id).slice(0, 4)} />
                    <TopCreators />
                </div>
            ) || (
                <Loading />
            )
        }
    </>
  )
}

export default Feed