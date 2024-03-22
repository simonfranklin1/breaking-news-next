import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn";

export const GET = async(req: Request, { params }: any) => {
    const id = params.id;
    try {
        await connectToDataBase();

        const post = await News.findById(id).populate("creator");

        if(!post) return new Response(JSON.stringify({ message: "Post não encontrado"}), { status: 400 });

        const sameCategoryPosts = await News.find({ category: post.category }).limit(4).populate("creator");

        if(!sameCategoryPosts) return new Response(JSON.stringify({ message: "Post não encontrado"}), { status: 400 });

        const relatedPosts = sameCategoryPosts.filter((item) => String(item._id) !== String(post._id));

        return new Response(JSON.stringify(relatedPosts), { status: 200 });
    } catch (error:any) {
        return new Response(error.message, { status: 500 })
    }
}