import React from "react";
import { NewsI, savedPost } from "../types/types";
import PostCard from "./PostCard";
import { MdOutlinePhoto, MdOutlinePhotoAlbum } from "react-icons/md";

interface ProfileProps {
    name: string;
    username: string;
    avatar: string;
    posts: NewsI[];
    saved?: savedPost[];
    show: "posts" | "savedPosts";
    setShow?: React.Dispatch<React.SetStateAction<"posts" | "savedPosts">>;
}

const Profile = ({ name, username, avatar, posts, saved, show, setShow }: ProfileProps) => {
    return (
        <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-14">
                <div className="flex justify-start items-center w-full gap-8">
                    <img src={avatar} alt="Avatar" className="w-40 h-40 object-cover rounded-full" />
                    <div className="flex-col flex h-full">
                        <div className="text-2xl font-semibold">
                            {name}
                        </div>
                        <div className="text-lg opacity-80">
                            @{username}
                        </div>
                        <div className="text-lg">
                            {posts.length} publicações
                        </div>
                    </div>
                </div>
                <div className="flex justify-start">
                    {
                        setShow && (
                            <>
                                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 duration-300 rounded-md rounded-r-none text-2xl font-semibold flex-center gap-3" onClick={() => setShow("posts")}>Posts <MdOutlinePhoto /></button>
                                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 duration-300 rounded-md rounded-l-none text-2xl font-semibold flex-center gap-3" onClick={() => setShow("savedPosts")}>Salvos <MdOutlinePhotoAlbum /></button>
                            </>
                        ) || (
                            <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 duration-300 rounded-md font-semibold text-2xl flex-center gap-3">Posts <MdOutlinePhoto /></div>
                        )
                    }
                </div>
            </div>
            <div className="posts_layout">
                {
                    show === "posts" && (
                        posts.map((post) => (
                            <div key={post._id} className="h-[530px]">
                                <PostCard {...post} />
                            </div>
                        ))
                    ) || show === "savedPosts" && (
                        saved && saved.map((post) => (
                            <div key={post.postId} className="h-[530px]">
                                <PostCard _id={post.postId} {...post} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Profile