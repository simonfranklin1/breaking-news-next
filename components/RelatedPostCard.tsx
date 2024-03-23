import { NewsI } from "@/types/types"
import React from "react"
import Link from "next/link"
import { truncateText } from "@/utils/utils"
import { TbPointFilled } from "react-icons/tb";

const RelatedPostCard = ({ post, rated = false }: { post: NewsI, rated?: boolean }) => {
  return (
    <Link href={"/posts/" + post._id}>
      <div className="flex flex-col lg:h-[270px] h-[300px] group">
        <img src={post.banner} alt={`Post ${post._id} Image`} className={`w-full rounded-lg object-cover ${rated ? "h-[%55]" : "h-[60%]"}`} />
        <div className="flex flex-col gap-2 py-3">
          <div className="flex items-center gap-2 font-[10px]">
            <img src={post.creator.avatar} alt="creator" className={`w-6 h-6 rounded-full object-cover`} />
            <div className="text-gray-600">
              {post.creator.name} <span className={`${rated ? "hidden" : "inline-block" }`}><TbPointFilled /></span> <span className={`${rated ? "hidden" : "inline-block" }`}>{new Date(post.createdAt).toLocaleDateString("pt-BR", {  year: "numeric", month: "short", day: "numeric" })}</span>
            </div>
          </div>
          <div className="text-base font-bold bg-white  capitalize font-news duration-300 group-hover:text-blue-500">
            {truncateText(post.title, 60)}
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