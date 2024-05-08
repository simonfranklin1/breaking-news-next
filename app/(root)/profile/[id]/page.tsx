"use client"

import { NewsI, UserI } from '@/types/types';
import { findUser, findUserPosts } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import Profile from '@/components/Profile';
import { Loading } from '@/components';

const page = ({ params }: any) => {
    const id = params.id;
    const [user, setUser] = useState<UserI | null>(null);
    const [posts, setPosts] = useState<NewsI[] | null>(null);

    useEffect(() => {
        window.scroll({
            top: 0
        })

        findUser(`${id}`).then(response => setUser(response));
        findUserPosts(`${id}`).then(response => setPosts(response));

    }, [id])

    return (
        <div>
            {
                user && posts && (
                    <Profile name={user.name} avatar={user.avatar} posts={posts} username={user.username} show='posts' />
                ) || (
                    <Loading />
                )
            }
        </div>
    )
}

export default page