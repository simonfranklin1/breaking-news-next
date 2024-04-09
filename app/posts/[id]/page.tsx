"use client"

import { NewsI, likePostI, postCommentI } from '@/types/types';
import { commentPost, deletePost, findPost, findPostsByCategory, findRelatedPosts, likePost } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loading, PostHeader, PostInteractions } from '@/components';
import RelatedPostCard from '@/components/RelatedPostCard';
import { useRouter } from 'next/navigation';

const page = ({ params }: any) => {
    const { data: session } = useSession();
    const id = params.id;
    const [post, setPost] = useState<NewsI | null>(null);
    const [related, setRelated] = useState<NewsI[] | null>(null);
    const [likes, setLikes] = useState<likePostI[] | null>(null);
    const [comments, setComments] = useState<postCommentI[] | null>(null);
    const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        window.scrollTo({
            top: 0
        })

        if (session?.user) {
            findPost(`${id}`).then((response) => {
                setPost(response);
                setLikes(response.likes);
                setComments(response.comments);

                const liked = response.likes.find((like) => like.userId === `${session?.user.id}`);
                const saved = session.user.saved.find((save) => String(save.postId) === String(id));

                if (liked) setAlreadyLiked(true);
                if (saved) setSaved(true);

                findPostsByCategory(`${response.category}`).then((res) => {
                    const relatedPosts = res.filter((item) => item._id !== response._id).slice(0, 3);

                    setRelated(relatedPosts);
                })
            });
        } else {
            alert("Faça login para interagir com os posts");
            router.push("/")
        }
    }, [session])

    const handleLike = () => {
        if (likes) {

            if (alreadyLiked) {
                setAlreadyLiked(false);
                setLikes(likes.filter((like) => like.userId !== `${session?.user.id}`));
                likePost(id, `${session?.user.id}`).then((response) => {
                    toast.success(response.message);
                }).catch(() => {
                    toast.error("Algo deu errado, tente novamente")
                });
            } else {
                setAlreadyLiked(true);
                setLikes([...likes, { userId: `${session?.user.id}`, createdAt: new Date() }]);
                likePost(id, `${session?.user.id}`).then((response) => {
                    toast.success(response.message);
                }).catch(() => {
                    toast.error("Algo deu errado, tente novamente")
                });
            }
        };
    };

    const handleComment = (e: FormEvent) => {
        e.preventDefault();

        if (comment.length > 0 && comments) {
            commentPost(comment, `${session?.user.name}`, `${session?.user.image}`, `${session?.user.id}`, id)
                .then((response) => {
                    toast.success(response.message);
                    setComments([
                        ...comments,
                        {
                            comment: comment,
                            avatar: `${session?.user.image}`,
                            idComment: response.commentId,
                            userId: `${session?.user.id}`,
                            username: `${session?.user.name}`,
                            createdAt: new Date()
                        }
                    ])
                    setComment("");
                }).catch(() => {
                    toast.error("Algo deu errado, tente novamente")
                });
        }
    }

    const handleDelete = () => {
        deletePost(`${post?._id}`).then((response) => {
            toast.success(response.message);
            router.push("/");
        }).catch(() => {
            toast.error("Algo deu errado, tente novamente")
        });
    }

    const handleSavePost = async () => {
        if (session && post) {
            let savedPosts = session.user.saved;

            if (saved) {
                setSaved(false);
            } else {
                setSaved(true);
            }

            const res = await fetch(`/api/user/${session?.user.id}/save`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postId: id,
                    title: post.title,
                    text: post.text,
                    banner: post.banner,
                    category: post.category,
                    creator: {
                        id: post.creator._id,
                        avatar: post.creator.avatar,
                        username: post.creator.username,
                        name: post.creator.name
                    },
                    createdAt: `${post.createdAt}`
                })
            })

            const data: { message: string } = await res.json();

            if (res.ok) {
                console.log(post.createdAt)

                if (saved) {
                    session.user.saved = savedPosts.filter((save) => save.postId !== id)
                } else {
                    session.user.saved = [...savedPosts, { postId: id, banner: post.banner, category: post.category, creator: { avatar: post.creator.avatar, name: post.creator.name, _id: post.creator._id }, text: post.text, title: post.title, createdAt: post.createdAt }]
                }

                toast.success(data.message);
            }

            if (!res) {
                setSaved(prev => prev);
                toast.error("Algo deu errado, tente novamente")
            }
        }
    }

    return (
        <>
            {
                post && likes && comments && session && (
                    <div>
                        <img src={post.banner} alt={post.title} className='sm:w-[100%] w-[100%] lg:h-[530px] sm:h-[450px] h-[300px] object-cover object-top rounded-lg shadow-2xl mb-8' />

                        <PostHeader
                            handleDelete={handleDelete}
                            handleSavePost={handleSavePost}
                            openMenu={openMenu}
                            post={post}
                            saved={saved}
                            setOpenMenu={setOpenMenu}
                            setSaved={setSaved}
                            user={session.user}
                        />

                        <div className="flex flex-col lg:flex-row sm:gap-8 lg:gap-16 justify-between w-full mt-8">
                            <div className='flex flex-col gap-8 lg:w-[70%] w-full'>

                                <div className="lg:text-xl sm:text-lg text-justify text-gray-700 font-news">
                                    {post.text}
                                </div>

                                <PostInteractions
                                    likes={likes}
                                    alreadyLiked={alreadyLiked}
                                    comments={comments}
                                    handleLike={handleLike}
                                    comment={comment}
                                    handleComment={handleComment}
                                    id={id}
                                    setComment={setComment}
                                    setComments={setComments}
                                    user={session.user}
                                />
                            </div>

                            <div className="lg:w-[30%] w-full">
                                <div className="text-xl font-bold uppercase mb-8">
                                    Notícias relacionadas
                                </div>
                                <div className="lg:flex lg:flex-col grid sm:grid-cols-2 gap-6 gap-y-4">
                                    {
                                        related?.map((item) => (
                                            <RelatedPostCard key={item._id} post={item} rated={false}  />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) || (
                    <Loading />
                )
            }
        </>
    )
}

export default page