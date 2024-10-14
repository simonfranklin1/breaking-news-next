import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn"

export const GET = async(req: Request) => {
    try {
        await connectToDataBase();

        const latestPosts = await News.find().sort({ _id: -1 }).limit(1).populate("creator");

        if(!latestPosts) {
            return new Response(JSON.stringify({ message: "Post não encontrado!"}), { status: 404 });
        }

        return new Response(JSON.stringify(latestPosts), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}