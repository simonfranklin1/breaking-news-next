import News from "@/models/News";
import { connectToDataBase } from "@/utils/conn";

export const GET = async(req: Request) => {
    try {   
        await connectToDataBase();

        const posts = await News.find({}).populate("creator");

        if(!posts) return new Response(JSON.stringify({ message: "Posts não encontrados!" }), { status: 400 });

        const testPosts = [
            {
                id: 1,
                likes: [1,2,4,5]
            },
            {
                id: 2,
                likes: [4,5]
            },
            {
                id: 3,
                likes: [1,2,4]
            },
            {
                id: 4,
                likes: [1]
            },
        ]

        const ratedPosts = posts.sort((a, b) => a.likes.length - b.likes.length).filter((post) => post !== posts[0]).slice(0, 4);

        return new Response(JSON.stringify(ratedPosts), { status: 200 });
    } catch (error: any) {
        return new Response(`${error.message}`, { status: 500 });
    }
}