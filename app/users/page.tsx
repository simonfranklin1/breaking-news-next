"use client"

import { useEffect, useState } from "react";
import { getTopCreators } from "@/components/TopCreators";
import CreatorCard, { TopCreatorI } from "@/components/CreatorCard";
import { Loading } from "@/components";

const page = () => {
    const [creators, setCreators] = useState<TopCreatorI[] | null>(null);

    useEffect(() => {
        getTopCreators().then(response => setCreators(response))
    }, [])

    return (
        <div className='flex flex-col gap-9'>
            <h1 className='capitalize text-2xl font-bold'>
                Início / Criadores
            </h1>
            <div>
                {
                    creators && (
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8">
                            {
                                creators.sort((a, b) => a.posts.length + b.posts.length).map((creator) => (
                                    <CreatorCard key={creator.user._id} {...creator} />
                                ))
                            }
                        </div>
                    ) || (
                        <Loading />
                    )
                }
            </div>
        </div>
    )
}

export default page