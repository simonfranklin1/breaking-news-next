"use client"

import { useEffect, useState } from "react";
import { PostList } from "../../components";
import { getTopCreators, getCreators } from "@/components/TopCreators";
import { UserI } from "@/types/types";
import UserCard from "@/components/UserCard";

const page = () => {
    const [creators, setCreators] = useState<UserI[] | null>(null);

    useEffect(() => {
        getCreators().then(response => setCreators(response))
    }, [])

    return (
        <div className='flex flex-col gap-9'>
            <h1 className='capitalize text-2xl font-bold'>
                Início / Criadores
            </h1>
            <div>
                <div className="text-xl">Nossos usuários</div>
                <div className="posts_layout">
                    {
                        creators && creators.map((creator) => (
                            <UserCard key={creator._id} {...creator} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page