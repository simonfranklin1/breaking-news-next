import { UserI } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const UserCard = (user: UserI) => {
    const { data: session } = useSession();

    return (
        <Link href={user._id === session?.user.id ? "/profile" : "/profile/" + user._id}>
            <div className='flex justify-start items-center flex-1 gap-4 min-w-full'>
                <img src={user.avatar} alt={"Avatar " + session?.user.name} className='h-20 w-20 rounded-full object-cover' />
                <div className="flex flex-col justify-between">
                    <div className="font-news text-xl font-bold">
                        {user.name}
                    </div>
                    <div className="text-lg text-blue-400">
                        @{user.username}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserCard