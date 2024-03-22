import { UserI } from "@/types/types";
import { PostList } from ".";

const getTopCreators = async () => {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();

  const users: UserI[] = data.users;

  return users;
}

const TopCreators = async() => {
  const creators = await getTopCreators();

  return (
    <div>
      <PostList link={"/users"} creators={creators} title="Top Criadores" />
    </div>
  )
}

export default TopCreators