import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn";

export const PATCH = async (req: Request, { params }: any) => {
    const { userId } = await req.json();
    const { id, idComment } = params;

    try {
        await connectToDataBase();

        const deleteComment = await News.findOneAndUpdate(
            { _id: id },
            { $pull: { comments: { userId, idComment } } }
        );

        if (!deleteComment) return new Response(JSON.stringify({ message: "Alguma coisa deu errado, tente novamente mais tarde!" }), { status: 400 });

        return new Response(JSON.stringify({ message: "Comentário removido com sucesso" }), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}