"use client"

import { useForm } from "react-hook-form"
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/components/input"
import { api }from '@/lib/api'
import { useRouter } from "next/navigation"


const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
    phone: z.string().refine( (value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/
    }, {
        message: "O numero de telefone deve estar (DD) 99999-9999"
    }),
    address: z.string()
})

type FormData = z.infer<typeof schema>


export default function NewCustomerForm({userId}: { userId: string}) {
    const {register, handleSubmit, formState:{ errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterCustomer(data:FormData){
        const response = await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            userId: userId,
            address: data.address
        })
        router.refresh();
        router.replace("/dashboard/customer");
    }


    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />

            <section className="flex gap-2 mt-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Exemplo: (DD) 85 994204854"
                        error={errors.phone?.message}
                        register={register}
                    />  
                </div>

                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="teste@teste.com"
                        error={errors.phone?.message}
                        register={register}
                    />  
                </div>
            </section>

        
            <label className="mb-1 text-lg font-medium">Endereço Completo</label>
                    <Input
                        type="address"
                        name="address"
                        placeholder="Rua Jasinto o Manto N:84"
                        error={errors.phone?.message}
                        register={register}
                    />  
                    
            <button 
                className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold"
                type="submit">
                Cadastrar
            </button>
        </form>
    )
}