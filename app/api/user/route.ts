import User from "@/models/User";
import { connectToDataBase } from "@/utils/conn"

export const GET = async(req: Request) => {
    try {
        await connectToDataBase();

        const findUsers = await User.find({}).sort({ _id: -1 })

        if(!findUsers)  {
            return new Response(JSON.stringify({ message: "Usuários não encontrados!"}), { status: 400 });
        }

        return new Response(JSON.stringify({ users: findUsers }), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}