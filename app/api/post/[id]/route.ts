import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn"

export const GET = async(req: Request, { params }: any) => {
    try {
        await connectToDataBase();

        const post = await News.findById(params.id).populate("creator");

        if(!post) {
            return new Response(JSON.stringify({ message: "Post não encontrado!"}), { status: 500 });
        }

        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}

export const DELETE = async(req: Request, { params }: any) => {
    try {
        await connectToDataBase();

        const post = await News.findById(params.id).populate("creator");

        if(!post) {
            return new Response(JSON.stringify({ message: "Post não encontrado!"}), { status: 400 });
        }

        const deletePost = await News.findByIdAndDelete(params.id);

        if(!deletePost) return new Response(JSON.stringify({ message: "Algo deu errado, tente novamente" }), { status: 400 })

        return new Response(JSON.stringify({ message: "Publicação deletada com sucesso"}), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}