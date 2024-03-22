"use client"

import { NewsI } from '@/types/types';
import { PostList } from '.';
import { useEffect, useState } from 'react';

const getSportPosts = async () => {
  const res = await fetch("api/post/category/esporte");
  const data: NewsI[] = await res.json();

  return data;
}

const SportsNews = () => {
  const [posts, setPosts] = useState<NewsI[] | null>(null);

  useEffect(() => {
    getSportPosts().then(response => setPosts(response));
  }, [])

  return (
    <>
      { posts && (
        <PostList link={"/posts/category/esporte"} title='Esporte' posts={posts} />
      )}
    </>
  )
}

export default SportsNews