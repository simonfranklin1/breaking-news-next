import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn"

export const GET = async(req: Request) => {
    try {
        await connectToDataBase();

        const latestPosts = await News.find().sort({ _id: -1 }).skip(1).limit(4).populate("creator");

        if(!latestPosts) {
            return new Response(JSON.stringify({ message: "Posts não encontrado!"}), { status: 404 });
        }

        return new Response(JSON.stringify(latestPosts), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}