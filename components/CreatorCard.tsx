"use client"

import { UserI, likePostI, postCommentI } from '@/types/types'
import React from 'react'
import Button from './Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export interface TopCreatorI {
    user: UserI,
    posts: {
        _id: string;
        title: string;
        text: string;
        banner: string;
        category: string;
        creator: string;
        likes: likePostI[];
        comments: postCommentI[];
        createdAt: Date;
    }[]
}

const CreatorCard = ({ user, posts }: TopCreatorI) => {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className='w-full flex flex-col bg-white rounded-md border-[1px] p-5 gap-6'>
            <div className='flex justify-start items-center flex-1 gap-5 min-w-full'>
                <img src={user.avatar} alt={"Avatar " + user.name} className='h-28 w-28 rounded-full object-cover' />
                <div className="flex flex-col justify-between">
                    <div className="lg:text-2xl text-xl tex font-bold">
                        {user.name}
                    </div>
                    <div className="text-lg text-slate-600">
                        @{user.username}
                    </div>
                    <div className="text-lg text-slate-600">
                        {posts.length} publicações
                    </div>
                </div>
            </div>
            <div>
                <Button text='Ver Perfil' type='button' styles='w-full' handleClick={() => router.push(user._id === session?.user.id ? "/profile" : "/profile/" + user._id)} />
            </div>
        </div>
    )
}

export default CreatorCard