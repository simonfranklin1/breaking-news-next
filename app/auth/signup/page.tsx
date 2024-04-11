"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from '@/utils/schema';
import { Button } from '@/components';
import { z } from "zod";
import Link from "next/link";
import { createNewUser } from "@/utils/utils";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if(session?.user) router.push("/")
    }, [session])

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignUp = async (values: any) => {
        try {
            setLoading(true);

            await createNewUser({ name: values.name, email: values.email, password: values.password });
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const continueWithGoogle = () => {
        setLoading(true);

        try {
            signIn("google")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='flex flex-col bg-white shadow-lg rounded-lg p-8 sm:w-[400px] w-[390px]' onSubmit={handleSubmit(handleSignUp)}>
            <div className="text-2xl font-semibold text-center">
                Criar nova conta
            </div>

            <div className="flex flex-col my-4 gap-3">
                <label className="flex flex-col">
                    <span className="mb-2">Nome</span>
                    <input type="text" {...register("name")} placeholder="Nome e Sobrenome" className="px-2 py-1 border-2 rounded-sm" />
                    {errors.name?.message && <p className="text-red-600">{`${errors.name?.message}`}</p>}
                </label>
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
                <Button type='submit' text={ !loading ? "CRIAR" : "CRIANDO..."} styles={ loading ? " pointer-events-none" : "" } />
                
                <button type="button" className="bg-white border-[1px] flex items-center justify-center gap-2 border-slate-400 duration-300 hover:shadow-md px-3 py-2 rounded-md" onClick={continueWithGoogle} >
                    <FcGoogle className="text-xl" /> Continuar com Google 
                </button>
            </div>

            <Link href={"/auth/signin"} className="font-medium text-center">
                Já tem uma conta? <span className="text-blue-700">Faça Login</span>
            </Link>
        </form>
    )
}

export default SignInPage