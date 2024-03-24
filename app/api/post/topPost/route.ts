import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn"

export const GET = async(req: Request) => {
    try {
        await connectToDataBase();

        const post = await News.findOne({ }).sort({ _id: -1 }).limit(2).populate("creator");

        if(!post) return new Response(JSON.stringify("Post não encontrado"), { status: 404 });

        return new Response(JSON.stringify(post), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}