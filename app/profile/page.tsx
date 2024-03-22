"use client"

import { NewsI, UserI, savedPost } from '@/types/types';
import { findUser, findUserPosts } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Profile from '@/components/Profile';

const page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserI | null>(null);
  const [posts, setPosts] = useState<NewsI[] | null>(null);
  const [show, setShow] = useState<"posts" | "savedPosts">("posts");

  useEffect(() => {
    window.scroll({
      top: 0
    })

    findUser(`${session?.user.id}`).then(response => setUser(response));
    findUserPosts(`${session?.user.id}`).then(response => setPosts(response));

  }, [session])

  return (
    <>
      {
        user && posts && (
          <Profile
            name={user.name}
            avatar={user.avatar}
            posts={posts}
            saved={user.saved}
            username={user.username}
            show={show}
            setShow={setShow}
          />
        )
      }
    </>
  )
}

export default page