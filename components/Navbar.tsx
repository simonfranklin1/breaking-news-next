"use client"

import Button from "./Button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FaRegEdit, FaUser, FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";


const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className='bg-white w-full py-7 px-4 sm:px-8 lg:px-0'>
      { /*<Image src={"/logo-breaking-news.png"} alt="Logo" width={128} height={56} /> */}
      <div className="max-w-[1100px] w-full mx-auto flex items-center justify-between ">
        <Link href="/" className="text-2xl font-news text-blue-700 font-bold">
          Breaking News
        </Link>
        <>
          {
            session?.user && (
              <div className="flex gap-3 items-center">
                <button className="sm:flex-center text-lg gap-1 font-semibold px-3 py-2 rounded-lg duration-300 bg-none border-none hover:text-blue-500 hidden" onClick={() => router.push("/posts/create")}>
                  <FaRegEdit />
                  Escrever
                </button>
                <button className="bg-none relative" onClick={() => setOpenMenu(prev => !prev)}>
                  <img src={`${session.user?.image}`} alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
                  <div className={`absolute text-base rounded-lg overflow-hidden bg-white top-[40px] right-0 shadow-xl z-20 dropdown ${openMenu ? "block" : "hidden"}`}>
                    <Link href={"/profile"} className="w-full py-2 px-7 gap-2 flex-center justify-start duration-300 hover:bg-slate-200">
                      <FaUser />
                      Perfil
                    </Link>
                    {/*
                      <Link href={"/auth/edit"} className="w-full py-2 px-7 gap-2 flex-center justify-start duration-300 hover:bg-slate-200">
                        <FaUserEdit />
                        Editar
                      </Link>
                    */}
                    <div className="w-full py-2 px-7 gap-2 flex-center justify-start duration-300 hover:bg-slate-200" onClick={() => signOut({ callbackUrl: "/" })}>
                      <CiLogout />
                      Sair
                    </div>
                  </div>
                </button>
              </div>
            ) || (
              <Link href={"/auth/signin"}>
                <Button text="ENTRAR" type="button" />
              </Link>
            )
          }
        </>
      </div>
    </nav>
  )
}

export default Navbar