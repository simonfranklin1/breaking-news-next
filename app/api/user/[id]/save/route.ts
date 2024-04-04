import User from "@/models/User"

export const PATCH = async(req: Request, { params }: { params: { id: string} }) =>{
    const id = params.id;
    const { postId, title, banner, category, text, creator, createdAt } = await req.json();
    try {
        const user = await User.findById(params.id);

        if(!user) return new Response(JSON.stringify({ message: "Usuário não encontrado" }), { status: 404 });

        if(!postId || !title || !banner || !category || !text || !creator || !createdAt) {
            return new Response(JSON.stringify({ message: "Algo deu errado, tente novamente" }), { status: 400 });
        }   

        const savePost = await User.findOneAndUpdate({ _id: id, "saved.postId": { $nin: [postId] } },
        { $push: { saved: { postId, title, text, banner, category, creator, createdAt: createdAt } } });

        if(!savePost) {
            await User.findOneAndUpdate({ _id: id },
                { $pull: { saved: { postId } } });

            return new Response(JSON.stringify({ message: "Publicação removida dos salvos" }), { status: 200 });
        }

        return new Response(JSON.stringify({ message: "Publicação adicionada aos salvos" }), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 })
    }
}