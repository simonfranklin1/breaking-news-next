import { NewsI, UserI } from '@/types/types';
import Link from 'next/link';
import { truncateText } from '@/utils/utils';


interface PostCardProps {

    _id: string;
    title: string;
    text: string;
    banner: string;
    creator: {
        avatar: string;
        name: string;
    };
    category: string;
    top?: boolean;
}

const PostCard = ({ _id, banner, category, creator, text, title, top }: PostCardProps) => {
    return (
        <Link href={"/posts/" + _id}>
            <div className={`flex w-full h-full ${top ? "lg:flex-row flex-col lg:gap-12 sm:gap-4" : "flex-col gap-6"} group`}>

                <div className={`${top ? "lg:w-[50%] w-full lg:h-full h-[350px]" : "w-full min-h-[255px]"} rounded-xl overflow-hidden`}>
                    <img src={banner} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 duration-300" />
                </div>

                <div className={`flex flex-col py-4 gap-2 ${top ? "pl-0 lg:w-[50%] sm:w-full justify-between" : "pt-0 h-[50%] justify-between"}`}>

                    <div className={`flex flex-col ${top ? "gap-4" : "gap-2"}`}>
                        <div className={`flex items-center  ${top ? "gap-4" : "gap-2"}`}>
                            <img src={creator.avatar} alt="creator" className={`${top ? "w-10 h-10" : "w-8 h-8"} rounded-full object-cover`} />
                            <div className="text-gray-600">
                                {creator.name}
                            </div>
                        </div>
                        <div className={`${top ? "lg:text-5xl sm:text-4xl text-2xl" : "text-lg"} font-bold font-news group-hover:text-blue-500 duration-300`}>
                            {
                                top ? truncateText(title, 44) : truncateText(title, 77)
                            }
                        </div>
                    </div>

                    <div className={`flex flex-col ${top ? "gap-4" : "gap-2"}`}>
                        <div className={`font-news text-gray-600 ${top ? "text-lg" : "gap-2"}`}>
                            {
                                top ? truncateText(text, 177) : truncateText(text, 94)
                            }
                        </div>
                        <div className="text-blue-700 font-semibold capitalize">
                            {category}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard