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

const TopCreators = () => {
  const [creators, setCreators] = useState<UserI[] | null>(null);
  useEffect(() => {
    getTopCreators().then((response) => {
      setCreators(response.sort((a, b) => {
        if (a.posts.length > b.posts.length) {
          return -1
        } else if (a.posts.length < b.posts.length) {
          return 1
        } else {
          return 0
        }
      }).map((item) => item.user))
    })
  }, [])

  return (
    <div>
      {
        creators && <PostList link={"/users"} creators={creators.slice(0, 4)} title="Top Criadores" />
      }
    </div>
  )
}

export default TopCreators