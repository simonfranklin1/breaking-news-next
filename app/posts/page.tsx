"use client"

import { PostBanner, PostCard } from '@/components';
import { NewsI } from '@/types/types'
import { findPosts } from '@/utils/utils';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [posts, setPosts] = useState<NewsI[] | null>(null);
  const firstPost = posts ? posts[0] : null;
  const anotherPosts = posts ? posts.filter((post) => post !== posts[0]) : null;


  useEffect(() => {
    findPosts().then(response => setPosts(response));
  }, []);

  return (
    <>
      {
        posts && firstPost && anotherPosts && (
          <div>
            <h1 className='capitalize text-3xl font-bold mb-10'>
              Últimas Notícias
            </h1>
            <div className='sm:flex flex-col gap-9 hidden'>
              <PostBanner post={firstPost} />
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                {
                  anotherPosts.map((post) => <PostCard key={post._id} {...post} top={false} />)
                }
              </div>
            </div>
            <div className="posts-layout sm:hidden">
              {
                posts.map((post) => (
                  <div key={post._id} className="sm:h-[530px] h-[470px] overflow-hidden">
                    <PostCard {...post} />
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default page