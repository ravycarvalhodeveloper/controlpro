"use client"

import { useRouter } from "next/navigation"
import {FiRefreshCcw} from 'react-icons/fi'


export default function ButtonRefresh() {
    const router = useRouter();

    return(
        <button 
            className="bg-green-600 px-4 py-1 rounded"
            onClick={() => router.refresh()}>
            <FiRefreshCcw size={24} color="#FFF" />
        </button>
    )
}