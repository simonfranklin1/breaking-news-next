"use client"

import { PostForm } from '@/components';
import { NewsI } from '@/types/types';
import { createPost, editPost, findPost } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const page = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const [post, setPost] = useState<NewsI | null>(null);
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        findPost(id).then(response => setPost(response))
    }, [])

    const action = ["Editar", "Editando Publicação..."];


    const handleEdit = (values: { title: string, text: string, banner: string, category: string }) => {
        if (session?.user && post) {
            setLoading(true);
            editPost(values.title, values.text, values.banner, values.category, post._id)
                .then((response) => {
                    toast.success(response.message);
                    router.push("/");
                }).catch((err: any) => console.log(err))
                .finally(() => setLoading(false))
        }
    }

    return (
        <>
            {
                post && <PostForm action={action} handleFunction={handleEdit} loading={loading} post={post} />
            }
        </>
    )
}

export default page