import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn";

export const POST = async(req: Request) => {
    try {
        await connectToDataBase();

        const { title, text, banner, category, userId } = await req.json();

        if(!title || !text || !banner || !category || !userId) {
            return new Response(JSON.stringify({ message: "Preencha todos os campos" }), { status: 400 });
        }

        const newPost = await News.create({
            title,
            text,
            banner,
            category,
            creator: userId
        })

        if(!newPost) return new Response("Algo deu errado, por favor tente mais tarde", { status: 400});

        return new Response(JSON.stringify({ newPost, message: "Publicação criado com sucesso" }), { status: 201 });
    } catch (error: any) {
        return new Response(`${error.message}`, { status: 500 });
    }
}