import * as z from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "Preencha seu email"}),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
})

export const signUpSchema = z.object({
    name: z.string().min(2, { message: "Preencha seu nome"}),
    email: z.string().email({ message: "Preencha seu email"}),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
})

export const postSchema = z.object({
    title: z.string().min(2, { message: "Preencha o título da notícia"}),
    banner: z.string().min(2, { message: "Preencha com a URL da notícia"}),
    text: z.string().min(2, { message: "Preencha o texto da notícia"}),
    category: z.string().min(2, { message: "Escolha uma categoria" })
})


export const editSchema = z.object({
    avatar: z.string().min(8, { message: "Este campo é obrigatório" }),
})

