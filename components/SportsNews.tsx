"use client"

import { NewsI } from '@/types/types';
import { PostList } from '.';

const SportsNews = ({ posts }: { posts: NewsI[] }) => {
  return (
    <>
      <PostList link={"/posts/category/esporte"} title='Esporte' posts={posts.slice(0, 4)} />
    </>
  )
}

export default SportsNews