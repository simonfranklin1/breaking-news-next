import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn";

export const PATCH = async(req: Request, { params }: any) => {
    const { userId, comment, avatar, username } = await req.json();
    const id = params.id;

    try {
        await connectToDataBase();

        let idComment = Math.floor(Math.floor(Date.now() * Math.random())).toString();

        const commentPost = await News.findOneAndUpdate(
            { _id: id },
            { $push: { comments: { idComment, userId, comment: comment, createdAt: new Date(), avatar, username } } }
        );

        if(!commentPost) return new Response(JSON.stringify({ message: "Alguma coisa deu errado, tente novamente mais tarde!" }), { status: 400 });

        return new Response(JSON.stringify({ message: "Comentário adicionado com sucesso", commentId: idComment }), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}