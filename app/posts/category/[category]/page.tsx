"use client"

import { PostBanner, PostCard } from '@/components';
import { NewsI } from '@/types/types'
import { findPostsByCategory } from '@/utils/utils';
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { category: string } }) => {
  const category = params.category;
  const [posts, setPosts] = useState<NewsI[] | null>(null);
  const firstPost = posts ? posts[0] : null;
  const anotherPosts = posts ? posts.filter((post) => post !== posts[0]) : null;

  useEffect(() => {
    findPostsByCategory(category).then(response => setPosts(response));
  }, []);

  return (
    <>
      {
        posts && firstPost && anotherPosts && (
          <div>
            <div className="mb-10">
              <PostBanner post={firstPost} />
            </div>
            <div className='flex flex-col gap-9'>
              <h1 className='capitalize text-2xl font-bold'>
                Notícias / {category}
              </h1>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                {
                  anotherPosts.map((post) => <PostCard key={post._id} {...post} top={false} />)
                }
              </div>
            </div>
          </div>
        ) || posts && posts.length < 1 &&  (
          <div>
          <div className='flex flex-col gap-9'>
            <h1 className='capitalize text-2xl font-bold'>
              Notícias / {category}
            </h1>
            <div className="h-[300px] flex-center">
              <div className="text-xl">
                Nenhuma notícia encontrada
              </div>
            </div>
          </div>
        </div>
        )
      }
    </>
  )
}

export default page