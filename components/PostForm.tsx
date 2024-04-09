"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from '@/utils/schema';
import { Button } from '@/components';
import { z } from "zod";
import { NewsI } from "@/types/types";
import Link from "next/link";

const PostForm = ({ handleFunction, action, post, loading }: {
  handleFunction: (values: any) => void,
  action: string[],
  post?: NewsI,
  loading: boolean
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof postSchema>>({
    defaultValues: {
      category: post ? post.category : "",
      banner: post ? post.banner : "",
      title: post ? post.title : "",
      text: post ? post.text : ""
    },
    resolver: zodResolver(postSchema)
  });



  return (
    <form className='flex flex-col sm:p-4' onSubmit={handleSubmit(handleFunction)}>
      <h1 className="uppercase text-5xl font-bold mb-4">
        <span className="blue_gradient">{action[0]}</span> post
      </h1>

      <div className="flex gap-3 flex-col mt-4 sm:w-[500px] p-5 bg-white border-gray-200 border rounded-lg shadow-xl">

        <label className="flex flex-col">
          <span className="mb-2 font-semibold">Título</span>
          <input type="text" {...register("title")} placeholder="Título da notícia" className="form-input" />
          {errors.title?.message && <p className="text-red-600">{`${errors.title?.message}`}</p>}
        </label>

        <label className="flex flex-col">
          <span className="mb-2 font-semibold">Banner</span>
          <input type="text" {...register("banner")} placeholder="URL do banner" className="form-input" />
          {errors.banner?.message && <p className="text-red-600">{`${errors.banner?.message}`}</p>}
        </label>

        <label>
          <span className="mr-2 font-semibold">
            Categoria
          </span>
          <select className="form-input" {...register("category")}>
            <option value="esporte">Esporte</option>
            <option value="animes">Animes</option>
            <option value="games">Games</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="crime">Crime</option>
            <option value="cultura">Cultura</option>
            <option value="trabalho">Trabalho</option>
            <option value="viagens">Viagens</option>
            <option value="automobilismo">Automobilismo</option>
            <option value="tecnologia">Tecnologia</option>
          </select>
          {errors.category?.message && <p className="text-red-600">{`${errors.category?.message}`}</p>}
        </label>

        <label>
          <span className="mb-2 font-semibold">Texto</span>
          <textarea {...register("text")} placeholder="Texto da Notícia" className="form-textarea" />
          {errors.text?.message && <p className="text-red-600">{`${errors.text?.message}`}</p>}
        </label>

        <div className="flex justify-end gap-4">
          <Link href={"/"}>
            <button className="px-3 py-2 rounded-md font-semibold uppercase h-full bg-gray-200 duration-300 hover:bg-gray-300">Cancelar</button>
          </Link>
          <Button text={loading ? action[1] : action[0]} type="submit" styles="uppercase" />
        </div>
      </div>
    </form>
  )
}

export default PostForm