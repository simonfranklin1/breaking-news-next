"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from '@/utils/schema';
import { Button, ContinueWithGoogleButton } from '@/components';
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const SignInPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema) });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();
    useEffect(() => {
        if (session?.user) router.push("/")
    }, [session])


    const handleSignIn = async (values: { email: string, password: string }) => {
        setLoading(true);

        const res = await signIn("credentials", {
            ...values,
            callbackUrl: "/",
            redirect: false
        })

        if (res) {
            setLoading(false);

            if (res.error) {
                toast.error("Senha ou email incorretos");
            } else if (res.ok) {
                toast.success("Login realizado com sucesso");
                router.push("/");
            }
        }
    }

    return (
        <form className='flex flex-col bg-white shadow-lg rounded-lg p-8 sm:w-[400px] w-[390px]' onSubmit={handleSubmit(handleSignIn)}>
            <div className="text-2xl font-semibold text-center">
                Entrar na sua conta
            </div>

            <div className="flex gap-3 flex-col my-4">
                <label className="flex flex-col">
                    <span className="mb-2">Email</span>
                    <input type="email" {...register("email")} placeholder="Seu e-mail" className="px-2 py-1 border-2 rounded-sm" />
                    {errors.email?.message && <p className="text-red-600">{`${errors.email?.message}`}</p>}
                </label>
                <label className="flex flex-col">
                    <span className="mb-2">Senha</span>
                    <input type="password" {...register("password")} placeholder="Sua senha" className="px-2 py-1 border-2 rounded-sm" />
                    {errors.password?.message && <p className="text-red-600">{`${errors.password?.message}`}</p>}
                </label>
                <Button type='submit' text={loading ? "ENTRANDO..." : "ENTRAR"} />

                <div className="flex gap-2 items-center">
                    <hr className="text-gray-400 w-full h-[1px]" />
                    Ou
                    <hr className="text-gray-400 w-full h-[1px]" />
                </div>

                <ContinueWithGoogleButton />
            </div>

            <Link href={"/signup"} className="font-medium text-center">
                Não tem uma conta? <span className="text-blue-700 hover:underline">Cadastre-se</span>
            </Link>
        </form>
    )
}

export default SignInPage