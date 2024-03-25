
import { PostCard } from '.';
import { NewsI } from '@/types/types';

const TopNews = ({ post }: { post: NewsI }) => {

  return (
    <div className="lg:h-[350px] h-auto">
      <PostCard {...post} top={true} />
    </div>
  )
}

export default TopNews