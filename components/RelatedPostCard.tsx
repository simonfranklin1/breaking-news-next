import { NewsI } from "@/types/types"
import React from "react"
import Link from "next/link"
import { truncateText } from "@/utils/utils"
import { TbPointFilled } from "react-icons/tb";
import moment from 'moment';
import "moment/locale/pt-br";

const RelatedPostCard = ({ post, rated }: { post: NewsI, rated: boolean }) => {
  moment.locale("pt-br");

  return (
    <Link href={"/posts/" + post._id}>
      <div className={`flex flex-col group ${rated ? "h-[270px]" : "h-[300px]"}`}>
        <div className={`w-full rounded-lg overflow-hidden ${rated ? "h-[50%]" : "h-[60%]"}`}>
          <img src={post.banner} alt={`Post ${post._id} Image`} className={`w-full object-cover h-full group-hover:scale-105 duration-300`} />
        </div>
        <div className={`flex flex-col gap-[10px] py-3  ${ rated ? "h-[40%]" : "h-[30%]"}`}>
          <div className={`flex items-center gap-2 font-[10px]`}>
            <img src={post.creator.avatar} alt="creator" className={`w-6 h-6 rounded-full object-cover`} />
            <div className="text-gray-600">
              {post.creator.name} <span className="inline-block"><TbPointFilled /></span> <span className="inline-block">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="text-[14px] font-bold bg-white capitalize font-news duration-300 group-hover:text-blue-500">
            {truncateText(post.title, 40)}
          </div>
          <div className="text-blue-700 font-medium capitalize">
            {post.category}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RelatedPostCard