import News from "@/models/News";
import User from "@/models/User";
import { connectToDataBase } from "@/utils/conn";


export const GET = async(req: Request, { params }: any) => {
    const id = params.id;

    try {
        await connectToDataBase();

        const user = await User.findById(id);

        if(!user) {
            return new Response(JSON.stringify({ message: "Usuário não encontrado!"}), { status: 404 });
        }

        const userPosts = await News.find({ creator: id }).sort({ _id: -1 }).populate("creator");

        return new Response(JSON.stringify(userPosts), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}