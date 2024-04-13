"use client"

import Button from "./Button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import MobileNavbar from "./MobileNavbar";


const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const [openNewsMenu, setOpenNewsMenu] = useState<boolean>(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  return (
    <nav className='bg-white w-full py-7 px-4 sm:px-8 xl:px-0'>
      { /*<Image src={"/logo-breaking-news.png"} alt="Logo" width={128} height={56} /> */}
      <div className="max-w-[1100px] w-full mx-auto flex items-center justify-between ">
        <div className="flex">
          <Link href="/" className="text-2xl font-news text-blue-700 font-bold">
            Breaking News<span className="text-gray-600 hidden sm:inline-block mx-3">|</span>
          </Link>

          <div className="sm:flex gap-4 items-center hidden">
            <Link href={"/about"} className="text-gray-600 font-semibold duration-200 hover:text-blue-700">
              Sobre
            </Link>
            <Link href={"/users"} className="text-gray-600 font-semibold duration-200 hover:text-blue-700">
              Criadores
            </Link>
            <div className="relative cursor-pointer" onClick={() => setOpenNewsMenu(prev => !prev)}>
              <div className="text-gray-600 font-semibold duration-200 hover:text-blue-700 relative">Notícias</div>

              <div className={`absolute text-base overflow-hidden rounded-lg bg-white top-[30px] left-0 shadow-xl z-20 dropdown flex-col ${openNewsMenu ? "flex" : "hidden"}`}>
                <Link href={"/posts/category/esporte"} className="w-full py-2 px-7 gap-2 text-start duration-300 hover:bg-slate-100 capitalize cursor-pointer">
                  esporte
                </Link>
                <Link href={"/posts/category/tecnologia"} className="w-full py-2 px-7 gap-2 text-start duration-300 hover:bg-slate-100 capitalize cursor-pointer">
                  tecnologia
                </Link>
                <Link href={"/posts/category/animes"} className="w-full py-2 px-7 gap-2 text-start duration-300 hover:bg-slate-100 capitalize cursor-pointer">
                  animes
                </Link>
                <Link href={"/posts/category/games"} className="w-full py-2 px-7 gap-2 text-start duration-300 hover:bg-slate-100 capitalize cursor-pointer">
                  games
                </Link>
              </div>
            </div>
          </div>
        </div>
        <>
          {
            session?.user && (
              <div>
                <div className="text-lg sm:hidden" onClick={() => setOpenMobileMenu(true)}>
                  <RiMenu3Fill />
                </div>

                <MobileNavbar open={openMobileMenu} setOpen={setOpenMobileMenu} userImage={session.user.image} username={session.user.name} />

                <div className="sm:flex gap-3 items-center hidden">
                  <button className="sm:flex-center text-lg gap-1 font-semibold px-3 py-2 rounded-lg duration-300 bg-none border-none text-gray-600 hover:text-blue-700 hidden" onClick={() => router.push("/posts/create")}>
                    <FaRegEdit />
                    Escrever
                  </button>
                  <button className="bg-none relative" onClick={() => setOpenUserMenu(prev => !prev)}>
                    <img src={`${session.user?.image}`} alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
                    <div className={`absolute text-base rounded-lg overflow-hidden bg-white top-[40px] right-0 shadow-xl z-20 dropdown ${openUserMenu ? "block" : "hidden"}`}>
                      <Link href={"/profile"} className="w-full py-2 px-7 gap-2 flex-center justify-start duration-300 hover:bg-slate-200">
                        <FaUser />
                        Perfil
                      </Link>
                      <Link href={"/posts/create"} className="w-full sm:hidden py-2 px-7 gap-2 flex-center justify-start duration-300 hover:bg-slate-200">
                        <FaRegEdit />
                        Escrever
                      </Link>
                      <div className="w-full py-2 px-7 gap-2 flex-center justify-start duration-300 hover:bg-slate-200" onClick={() => signOut({ callbackUrl: "/" })}>
                        <CiLogout />
                        Sair
                      </div>
                    </div>
                  </button>
                </div>
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