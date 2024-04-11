import News from "@/models/News";
import User from "@/models/User";
import { connectToDataBase } from "@/utils/conn"

export const GET = async (req: Request) => {
    try {
        await connectToDataBase();

        const findUsers = await User.find({})

        if (!findUsers) {
            return new Response(JSON.stringify({ message: "Usuários não encontrados!" }), { status: 400 });
        }

        const usersWithPosts = await Promise.all(findUsers.map(async(user) => {
            const posts = await News.find({ creator: user._id }).populate("creator")

            return { user, posts }
        }))

        if (!usersWithPosts) {
            return new Response(JSON.stringify({ message: "Usuários não encontrados!" }), { status: 400 });
        }

        const topCreators = usersWithPosts.sort((a, b) => a.posts.length + b.posts.length).filter((data) => data.posts.length > 0);

        return new Response(JSON.stringify({ users: topCreators }), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}