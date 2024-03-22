import { NewsI } from '@/types/types'
import React from 'react'
import Link from 'next/link'
import { truncateText } from '@/utils/utils'

const RelatedPostCard = ({ post }: { post: NewsI }) => {
  return (
    <Link href={"/posts/" + post._id}>
      <div className='flex flex-col gap-3 lg:h-[270px] h-[300px] group'>
        <img src={post.banner} alt={`Post ${post._id} Image`} className='w-full rounded-lg object-cover h-[60%]' />
        <div className="flex items-center gap-2 font-[10px]">
          <img src={post.creator.avatar} alt="creator" className={`w-7 h-7 rounded-full object-cover`} />

          <div className='text-gray-600 flex items-center'>
            {post.creator.name}, {new Date(post.createdAt).toLocaleDateString("pt-BR", {  year: "numeric", month: "short", day: "numeric" })}
          </div>
        </div>
        <div className="text-base font-bold bg-white  capitalize font-news duration-300 group-hover:text-blue-500">
          {truncateText(post.title, 80)}
        </div>
      </div>
    </Link>
  )
}

export default RelatedPostCard