"use client"

import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import React from "react";

const MobileNavbar = ({ open, setOpen, username, userImage }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, username: string, userImage: string }) => {
    return (
        <>
            <div className={`bg-black fixed top-0 left-0 w-full h-full z-20 opacity-60 ${open ? "" : "hidden"}`} onClick={() => setOpen(false)}></div>
            <div className={`fixed top-0 ${open ? "right-0" : "right-[-100%]"} flex gap-8 flex-col duration-500 w-[60%] h-full sm:hidden bg-white z-30 p-6`}>
                <div className="text-xl text-end w-full" onClick={() => setOpen(false)}>
                    <IoMdClose />
                </div>

                <div className="flex gap-6 flex-col items-start">
                    <Link href={"/profile"} className="w-full flex gap-2 flex-center justify-start duration-500 text-gray-600" onClick={() => setOpen(false)}>
                        <img src={userImage} alt={"perfil " + username} className="w-8 h-8 rounded-full" />
                        @{username}
                    </Link>
                    <Link href={"/"} className="text-gray-600 font-semibold w-full text-xl" onClick={() => setOpen(false)}>
                        Início
                    </Link>
                    <Link href={"/posts/create"} className="text-gray-600 font-semibold w-full text-xl" onClick={() => setOpen(false)}>
                        Escrever
                    </Link>
                    <Link href={"/about"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Sobre
                    </Link>
                    <Link href={"/users"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Criadores
                    </Link>
                    <Link href={"/posts"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Notícias
                    </Link>
                    <Link href={"/posts/category/esporte"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Esporte
                    </Link>
                    <Link href={"/posts/category/tecnologia"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Tecnologia
                    </Link>
                    <Link href={"/posts/category/animes"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Animes
                    </Link>
                    <Link href={"/posts/category/games"} className="text-gray-600 font-semibold text-xl" onClick={() => setOpen(false)}>
                        Games
                    </Link>
                    <div className="text-gray-600 font-semibold text-xl" onClick={() => {
                        signOut({ callbackUrl: "/" })
                        setOpen(false)
                    }}>
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileNavbar