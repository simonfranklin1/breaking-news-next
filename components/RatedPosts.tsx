"use client"

import { NewsI } from '@/types/types';
import { PostBanner, PostCard } from '.';
import { truncateText } from '@/utils/utils';
import Link from 'next/link';
import RelatedPostCard from './RelatedPostCard';
import moment from 'moment';
import "moment/locale/pt-br";
import { TbPointFilled } from 'react-icons/tb';

const RatedPosts = ({ posts }: { posts: NewsI[] }) => {
    const mostRated = posts[0];

    return (
        <div>
            <div className="text-3xl font-semibold mb-6 flex justify-between items-start">
                Deveria ler
            </div>
            <div className="lg:grid lg:grid-cols-4 sm:grid-cols-2 gap-6 sm:h-[530px] h-[470px] hidden">
                <PostCard key={posts[1]._id} {...posts[1]} />
                <div className='col-span-2'>
                    <PostBanner post={mostRated} rated />
                </div>
                <div className="flex flex-col">
                    <RelatedPostCard post={posts[2]} rated />
                    <RelatedPostCard post={posts[3]} rated />
                </div>
            </div>

            <div className="posts_layout lg:hidden">
                {
                    posts.map((post) => (
                        <PostCard key={post._id} {...post} />
                    ))
                }
            </div>

        </div>
    )
}

export default RatedPosts