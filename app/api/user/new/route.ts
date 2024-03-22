import { connectToDataBase } from "@/utils/conn";
import User from "@/models/User";

export const POST = async (req: Request) => {
    try {
        await connectToDataBase();

        let { name, username, email, password, avatar, background } = await req.json()

        if ( !name || !username || !email || !password ) {
            return new Response("Preencha todos os campos!", { status: 400 })
        }

        if( !avatar && !background ) {
            avatar = "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png";
            background = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTcFI6hTmgUtdxQTZktMt5KgEbySf4mtRgfQ&usqp=CAU"; 
        }

        const createUser = await User.create({ name, username, email, password, avatar, background });

        if(!createUser) {
            return new Response("Algo deu errado, por favor tente mais tarde", { status: 400});
        }

        return new Response(JSON.stringify({ message: "Usuário criado com sucesso!", createdUser: { _id: createUser._id, email: createUser.email } }), { status: 201 })
    } catch (error: any) {
        return new Response(error.message, { status: 500})
    }
}