"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema } from '@/utils/schema';
import { Button } from '@/components';
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UserI } from "@/types/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { findUser } from "@/utils/utils";

const EditUserPage = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserI | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            findUser(`${session.user.id}`).then((response) => {
                setUser(response);
                console.log(response);
            });
        }
    }, [session])

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof editSchema>>({
        defaultValues: {
            avatar: user ? user.avatar : ""
        },
        resolver: zodResolver(editSchema)
    });

    const handleEditUser = async (values: any) => {
        setLoading(true);

        try {
            if (session?.user && user) {
                const res = await fetch(`/api/user/${user._id}/edit`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...values
                    })
                });

                const data = await res.json();

                const newUserData = {
                    avatar: values.avatar
                }

                if (res.ok) {
                    toast.success(data.message);
                    session.user.image = newUserData.avatar;
                    router.push("/");   
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {
                user && (
                    <form className='flex flex-col bg-white shadow-lg rounded-lg p-8 sm:w-[400px] w-[390px]' onSubmit={handleSubmit(handleEditUser)}>
                        <div className="text-2xl font-semibold text-center">
                            Editar sua foto
                        </div>

                        <div className="flex flex-col my-4 gap-3">
                            <label className="flex flex-col">
                                <span className="mb-2">Foto de perfil</span>
                                <input type="text" {...register("avatar")} placeholder="Link da foto de perfil" className="px-2 py-1 border-2 rounded-sm" />
                                {errors.avatar?.message && <p className="text-red-600">{`${errors.avatar?.message}`}</p>}
                            </label>
                            <Button type='submit' text={!loading ? "EDITAR" : "SALVANDO ALTERAÇÕES..."} styles={loading ? " pointer-events-none" : ""} />
                        </div>
                    </form>
                )
            }
        </>
    )
}

export default EditUserPage