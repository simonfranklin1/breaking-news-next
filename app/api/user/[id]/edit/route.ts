import { connectToDataBase } from "@/utils/conn";
import User from "@/models/User";

export const PATCH = async (req: Request, { params }: { params: { id: string }}) => {
    const id = params.id;
    
    try {
        await connectToDataBase();

        const { avatar } = await req.json()

        if ( !avatar ) {
            return new Response("Preencha todos os campos!", { status: 400 });
        }

        const editUser = await User.findByIdAndUpdate(id, { avatar });

        if(!editUser) {
            return new Response(JSON.stringify({ message: "Algo deu errado, por favor tente mais tarde" }), { status: 400});
        }

        return new Response(JSON.stringify({ message: "Foto de perfil atualizada" }), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500})
    }
}