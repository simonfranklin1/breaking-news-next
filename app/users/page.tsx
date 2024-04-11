"use client"

import { useEffect, useState } from "react";
import { getTopCreators } from "@/components/TopCreators";
import CreatorCard, { TopCreatorI } from "@/components/CreatorCard";

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
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-6">
                    {
                        creators && creators.map((creator) => (
                            <CreatorCard key={creator.user._id} {...creator} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page