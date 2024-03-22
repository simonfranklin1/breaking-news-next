import User from "@/models/User";
import { connectToDataBase } from "@/utils/conn";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        await connectToDataBase();

        const { email, password } = await req.json();

        const user: any = await User.findOne({ email: email }).select("+password");

        if (!user) {
            return new Response(JSON.stringify({ message: "Senha ou email errados!" }), { status: 404 })
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if(!validatePassword) {
            return new Response(JSON.stringify({ message: "Senha ou email errados!" }), { status: 400 })
        }

        return new Response(JSON.stringify({ id: user._id, name: user.username, avatar: user.avatar, email: user.email, message: "Login realizado com sucesso!"}), { status : 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}