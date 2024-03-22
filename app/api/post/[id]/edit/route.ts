import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn";

export const PATCH = async(req: Request, { params }: { params: { id: string } }) =>{
    const id = params.id;
    
    try {
        await connectToDataBase();

        const postExists = await News.findById(id);

        if(!postExists) return new Response(JSON.stringify({ message: "Publicação não encontrada" }))

        const { title, text, banner, category } = await req.json();

        if(!title || !text || !banner || !category) {
            return new Response(JSON.stringify({ message: "Preencha todos os campos" }), { status: 400 });
        }

        const editPost = await News.findByIdAndUpdate(id, {
            title,
            text,
            banner,
            category,
        })

        if(!editPost) return new Response("Algo deu errado, por favor tente mais tarde", { status: 400});

        return new Response(JSON.stringify({ editPost, message: "Publicação editada com sucesso" }), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status : 500 })
    }
}