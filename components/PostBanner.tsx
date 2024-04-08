import { NewsI } from "@/types/types"
import { truncateText } from "@/utils/utils"
import Link from "next/link"
import React from "react"
import moment from 'moment';
import "moment/locale/pt-br";
import { TbPointFilled } from "react-icons/tb";

const PostBanner = ({ post, rated }: { post: NewsI, rated?: boolean }) => {
    moment.locale("pt-br");

    return (
        <Link href={"/posts/" + post._id}>
            <div style={{ backgroundImage: `url(${post.banner})` }} className={`w-full rounded-xl lg:h-[530px] h-[400px] flex justify-start items-end p-4 px-8 text-white relative overflow-hidden banner-shadow ${rated ? "bg-[size:180%] bg-center hover:bg-[size:190%] duration-300" : "zoom-div"}`}>
                <div className="flex flex-col gap-2 z-10">
                    <div className="flex items-center gap-3">
                        <img src={post.creator.avatar} alt="creator" className={`w-8 h-8" rounded-full object-cover`} />
                        <div>
                            {post.creator.name} <span className="inline-block"><TbPointFilled /></span> {moment(post.createdAt).fromNow()}
                        </div>
                    </div>

                    {
                        !rated && (
                            <>
                                <div className="lg:text-3xl sm:text-xl hidden sm:block font-news font-semibold">
                                    {truncateText(post.title, 70)}
                                </div>
                                <div className="lg:text-lg sm:text-base hidden sm:block">
                                    {truncateText(post.text, 230)}
                                </div>
                            </>
                        ) || (
                            <>
                                <div className="lg:text-2xl sm:text-xl hidden sm:block font-news font-semibold">
                                    {truncateText(post.title, 80)}
                                </div>
                                <div className="text-base hidden sm:block">
                                    {truncateText(post.text, 110)}
                                </div>

                            </>
                        )
                    }

                    <div className="lg:text-lg sm:text-base capitalize font-medium">
                        {post.category}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostBanner