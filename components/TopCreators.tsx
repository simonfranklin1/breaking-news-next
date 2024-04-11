"use client"

import { UserI } from "@/types/types";
import { PostList } from ".";
import { useEffect, useState } from "react";
import { TopCreatorI } from "./CreatorCard";

export const getTopCreators = async () => {
  const res = await fetch("api/user/top");
  const data = await res.json();

  const users: TopCreatorI[] = data.users;

  return users;
}

export const getCreators = async () => {
  const res = await fetch("api/user");
  const data = await res.json();

  const users: UserI[] = data.users;

  return users;
}

const TopCreators = () => {
  const [creators, setCreators] = useState<UserI[] | null>(null);

  useEffect(() => {
    getTopCreators().then(response => {
      setCreators(response.sort((a, b) => a.posts.length + b.posts.length).map((item) => item.user))
      console.log(response)
    })

  }, [])

  return (
    <div>
      {
        creators && <PostList link={"/users"} creators={creators} title="Top Criadores" />
      }
    </div>
  )
}

export default TopCreators