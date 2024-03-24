"use client"

import { PostForm } from '@/components';
import { createPost } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {
  const { data: session } = useSession();
  const action = [ "Criar", "Criando Publicação..." ];
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCreate = (values: { title: string, text: string, banner: string, category: string }) => {
    if (session?.user) {

      setLoading(true);
      
      createPost(values.title, values.text, values.banner, `${session?.user.id}`, values.category)
        .then((response) => {
          toast.success(response.message);
          router.push("/");
        }).catch((err: any) => {
          console.log(err);
        }).finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <PostForm action={action} handleFunction={handleCreate} loading={loading} />
  )
}

export default page