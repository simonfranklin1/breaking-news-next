import { NewsI, UserI } from '@/types/types'
import { PostCard } from '.'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { FaArrowRight } from "react-icons/fa";
import UserCard from './UserCard'

interface PostListProps {
    title: string;
    link: Url;
    posts?: NewsI[];
    creators?: UserI[];
}

const PostList = ({ title, link, posts, creators }: PostListProps) => {

    return (
        <div>
            <div className="text-3xl font-semibold mb-6 flex justify-between items-start">
                {title}
                <Link href={link} className='text-blue-700 font-medium text-lg flex-center gap-2'>
                    Ver mais <FaArrowRight />
                </Link>
            </div>
            <div className={`${ posts ? "posts_layout" : "grid lg:grid-cols-4 sm:grid-cols-2 gap-6"}`}>
                {
                    posts && posts.map((post) => (
                        <div key={post._id} className="sm:h-[530px] h-[470px] overflow-hidden">
                            <PostCard {...post} />
                        </div>
                    )) ||  creators && (
                        creators.map((creator) => (
                            <UserCard key={creator._id} {...creator} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default PostList