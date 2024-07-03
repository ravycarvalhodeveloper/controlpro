import Container from "@/components/container";
import Link from "next/link";


export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
                <Link 
                    className="text-white font-semibold hover:font-bold duration-300" 
                    href="/dashboard">
                    Chamados
                </Link>
                <Link 
                    className="text-white font-semibold hover:font-bold duration-300"
                    href="/dashboard/customer">
                    Clients
                </Link>
            </header>
        </Container>
    )
}