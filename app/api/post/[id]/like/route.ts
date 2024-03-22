import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn"

export const PATCH = async(req: Request, { params }: any) => {
    const id = params.id;
    const { userId } = await req.json();
    try {
        await connectToDataBase();

        const likePost = await News.findOneAndUpdate({ _id: id, "likes.userId": { $nin: [userId] } },
        { $push: { likes: { userId, createdAt: new Date() } } });

        if(!likePost) {
            await News.findOneAndUpdate({ _id: id },
                { $pull: { likes: { userId } } });

            return new Response(JSON.stringify({ message: "Curtida removida com sucesso" }), { status: 200 });
        }

        return new Response(JSON.stringify({ message: "Curtida adicionada com sucesso" }), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}