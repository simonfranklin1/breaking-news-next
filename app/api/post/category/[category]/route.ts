import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn"


export const GET = async(req: Request, { params }: any) => {
    try {
        await connectToDataBase();

        const posts = await News.find({ category: params.category }).sort({ _id: -1 }).populate("creator");

        if(!posts) return new Response(JSON.stringify({ message: "Posts não encontrados!"}), { status: 400 });

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}