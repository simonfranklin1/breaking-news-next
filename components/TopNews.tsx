"use client"

import { getTopPost } from '@/utils/utils';
import { Loading, PostCard } from '.';
import { useEffect, useState } from 'react';
import { NewsI } from '@/types/types';

const TopNews = () => {
  const [post, setPost] = useState<NewsI | null>(null);

  useEffect(() => {
    getTopPost().then(response => setPost(response));
  }, []);

  return (
    <div className="lg:h-[350px] h-auto">
      {
        post && (
          <PostCard {...post} top={true} />
        ) || (
          <Loading />
        )
      }
    </div>
  )
}

export default TopNews