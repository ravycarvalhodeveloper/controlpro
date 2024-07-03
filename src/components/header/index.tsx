"use client"

import Link from "next/link"
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi"
import { signIn, signOut, useSession} from "next-auth/react"


export default function Header() {
    const { status, data} = useSession()

    console.log(status)

    async function handleLogin() {
        await signIn();
    }

    async function handleLogout() {
        await signOut();
    }

    return (
        <header className="w-ful flex items-center px-2 py-4 bg-white h-20 shadow-sm">
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

                <Link href="/">
                    <h1 className="font-bold text-2xl hover:tracking-widest duration-300">
                         Control<span className="font-black text-blue-700">PRO</span> 
                    </h1>
                </Link>

                {status === "loading" && (
                    <button className="animate-spin">
                        <FiLoader size={26} color="#1d4ed8"/>
                    </button>
                )}

                {status === "unauthenticated" && (
                    <button onClick={handleLogin} >
                        <FiLock size={26} color="#1d4ed8"/>
                    </button>
                )}

                {status === "authenticated" && (
                     <div className="flex items-baseline gap-5">
                     <button>
                         <Link href="/dashboard">
                             <FiUser size={26} color="#1d4ed8" />
                         </Link>
                     </button>
                     <button onClick={handleLogout}>
                             <FiLogOut size={26} color="red" />
                     </button>
                 </div>
                )}


            </div>
        </header>
    )
}