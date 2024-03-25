"use client"

import { NewsI } from '@/types/types';
import { PostList } from '.';

const getSportPosts = async () => {
  const res = await fetch("api/post/category/esporte");
  const data: NewsI[] = await res.json();

  return data;
}

const SportsNews = ({ posts }: { posts: NewsI[] }) => {
  return (
    <>
      <PostList link={"/posts/category/esporte"} title='Esporte' posts={posts.slice(0, 4)} />
    </>
  )
}

export default SportsNews