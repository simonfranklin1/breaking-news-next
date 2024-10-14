import { signIn } from 'next-auth/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const ContinueWithGoogleButton = () => {
    return (
        <button type="button" className="bg-white border-[1px] flex items-center justify-center gap-2 border-slate-400 duration-300 hover:bg-slate-100 px-3 py-2 rounded-md" onClick={() => signIn("google")}>
            <FcGoogle className="text-xl" /> Continuar com Google
        </button>
    )
}

export default ContinueWithGoogleButton