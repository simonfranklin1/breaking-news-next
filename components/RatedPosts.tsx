"use client"

import { NewsI } from '@/types/types';
import React, { useEffect, useState } from 'react'
import { PostCard } from '.';
import { truncateText } from '@/utils/utils';
import Link from 'next/link';
import RelatedPostCard from './RelatedPostCard';

const RatedPosts = () => {
    const [posts, setPosts] = useState<NewsI[] | null>(null);

    const mostRated = posts ? posts[0] : null;

    useEffect(() => {
        (async () => {
            const res = await fetch("api/post/rated");
            const data: NewsI[] = await res.json();

            setPosts(data);
        })()
    }, [])

    return (
        <div>
            {
                posts && mostRated && (
                    <>
                        <div className="text-3xl font-semibold mb-6 flex justify-between items-start">
                            Deveria ler
                        </div>
                        <div className="lg:grid lg:grid-cols-4 sm:grid-cols-2 gap-6 sm:h-[530px] h-[470px] hidden">
                            <PostCard key={posts[1]._id} {...posts[1]} />
                            <div className='col-span-2'>
                                <Link href={"/posts/" + mostRated._id}>
                                    <div style={{ backgroundImage: `url(${mostRated.banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className='w-full rounded-xl lg:h-[530px] h-[400px] flex justify-start items-end p-4 px-8 text-white relative object-cover object-center overflow-hidden banner-shadow'>
                                        <div className="flex flex-col gap-2 z-10">
                                            <div className="flex items-center gap-3">
                                                <img src={mostRated.creator.avatar} alt="creator" className={`w-8 h-8" rounded-full object-cover`} />
                                                <div>
                                                    {mostRated.creator.name}
                                                </div>
                                            </div>
                                            <div className="lg:text-2xl sm:text-xl hidden sm:block font-news font-semibold">
                                                {truncateText(mostRated.title, 80)}
                                            </div>
                                            <div className="text-base hidden sm:block">
                                                {truncateText(mostRated.text, 110)}
                                            </div>
                                            <div className="lg:text-lg sm:text-base capitalize">
                                                {mostRated.category}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col">
                                <RelatedPostCard post={posts[2]} rated={true} />
                                <RelatedPostCard post={posts[3]} rated={true} />
                            </div>
                        </div>

                        <div className="posts_layout lg:hidden">
                            {
                                posts.map((post) => (
                                    <PostCard key={post._id} {...post} />
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default RatedPosts