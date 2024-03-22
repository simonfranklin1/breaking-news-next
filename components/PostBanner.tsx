import { NewsI } from '@/types/types'
import { truncateText } from '@/utils/utils'
import Link from 'next/link'
import React from 'react'

const PostBanner = ({ post }: { post: NewsI }) => {
    return (
        <Link href={"/posts/" + post._id}>
            <div style={{ backgroundImage: `url(${post.banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='w-full rounded-xl lg:h-[500px] sm:h-[450px] flex justify-start items-end p-4 px-8 text-white relative overflow-hidden shadow-md'>
                <div className="bg-black absolute top-0 left-0 w-full h-full opacity-30" />

                <div className="flex flex-col gap-2 z-10">
                    <div className="flex items-center gap-3">
                        <img src={post.creator.avatar} alt="creator" className={`w-8 h-8" rounded-full object-cover`} />
                        <div>
                            {post.creator.name}
                        </div>
                    </div>
                    <div className="lg:text-3xl sm:text-xl font-news font-semibold">
                        {truncateText(post.title, 70)}
                    </div>
                    <div className="lg:text-lg sm:text-base">
                        {truncateText(post.text, 230)}
                    </div>
                    <div className="lg:text-lg sm:text-base capitalize">
                        {post.category}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostBanner