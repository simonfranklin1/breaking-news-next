import { likePostI, postCommentI } from '@/types/types';
import React, { FormEvent } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import Link from 'next/link';
import { deleteComment } from '@/utils/utils';
import { toast } from 'react-hot-toast';
import { FaRegTrashAlt, FaArrowCircleDown } from "react-icons/fa";

const PostComment = ({ comment, user, postId, comments, setComments }:
    {
        comment: postCommentI,
        user: {
            id: string;
            name: string;
            image: string;
            email: string;
        }, postId: string,
        comments: postCommentI[],
        setComments: React.Dispatch<React.SetStateAction<postCommentI[] | null>>
    }) => {
    const handleDeleteComment = () => {
        deleteComment(user.id, postId, comment.idComment).then((response) => {
            if (comments) {
                const filteredComments = comments.filter((item) => item.idComment !== comment.idComment);
                setComments(filteredComments);
                toast.success(response.message);
            }
        });
    }

    return (
        <div className="flex items-start gap-2 mb-6 sm:justify-normal max-w-[95%]">
            <Link href={comment.userId === user.id ? "/profile" : "/profile/" + comment.userId} >
                <img src={comment.userId === user.id ? user.image : comment.avatar} alt={comment.username} className="sm:w-12 sm:h-12 w-7 h-7 rounded-full object-cover" />
            </Link>
            <div className="flex flex-col px-5 gap-2 relative max-w-[90%]">
                <div className="text-lg font-bold">
                    {comment.username}
                </div>
                {comment.comment}
                <button className={`absolute top-[5px] right-[-25px] duration-200 hover:scale-105 hover:text-red-500 text-lg ${comment.userId !== user.id ? "hidden" : ""}`} onClick={handleDeleteComment}>
                    <FaRegTrashAlt />
                </button>
            </div>
        </div>
    )
}

interface PostInteractionProps {
    likes: likePostI[];
    comments: postCommentI[];
    alreadyLiked: boolean;
    handleLike: () => void;
    handleComment: (e: FormEvent) => void;
    user: {
        id: string;
        name: string;
        image: string;
        email: string;
    },
    id: string;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    setComments: React.Dispatch<React.SetStateAction<postCommentI[] | null>>;
}

const PostInteractions = ({ likes, comments, alreadyLiked, handleLike, handleComment, user, id, comment, setComment, setComments }: PostInteractionProps) => {
    const handleType = () => {
        document.getElementById("commentInput")?.focus();
    }

    return (
        <>
            <div className="flex justify-between">
                <div className="flex gap-6">
                    <button className="text-xl flex-center gap-3 hover:text-blue-500 bg-none border-none" onClick={handleLike}>
                        {alreadyLiked ? <FaHeart /> : <FaRegHeart />} {likes.length}
                    </button>
                    <button className="text-xl flex-center gap-3 hover:text-blue-500 bg-none border-none" onClick={handleType}>
                        <FaRegComment /> {comments.length}
                    </button>
                </div>
            </div>

            <form onSubmit={handleComment} className='relative'>
                <input type="text" id='commentInput' placeholder={`Adicionar comentário como ${user.name}`} value={comment} onChange={(e) => setComment(e.target.value)} className='px-2 py-3 rounded-[25px] border-2 border-transparent focus:border-blue-700 outline-none bg-slate-50 w-full' />
                <button className={`text-blue-500 font-semibold absolute top-2 right-2 text-4xl ${comment.length ? "block" : "hidden"}`} type='submit'>
                    <FaArrowCircleDown />
                </button>
            </form>

            <div className="py-4 text-lg border-t-2 border-b-2 text-center">
                Comentários
            </div>
            <div className={`flex flex-col ${comments.length < 1 ? "justify-center" : ""} px-2 py-4 min-h-[300px] mb-8`}>
                {
                    comments.length < 1 && (
                        <div className="text-xl text-center">
                            Nenhum comentário
                        </div>
                    ) || (
                        comments.map((comment) => (
                            <PostComment key={comment.idComment} comment={comment} user={user} postId={`${id}`} comments={comments} setComments={setComments} />
                        ))
                    )
                }
            </div>
        </>
    )
}

export default PostInteractions