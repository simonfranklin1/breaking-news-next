import { PostList } from '.';
import { NewsI } from '@/types/types';

const LatestNews = ({ posts }: { posts: NewsI[] }) => {

    return (
        <>
            <PostList posts={posts.slice(0, 4)} link={"/posts"} title="Últimas notícias" />
        </>
    )
}

export default LatestNews