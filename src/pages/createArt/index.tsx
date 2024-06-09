import Navbar from "@/components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function CreateArt() {
    const [name, setName] = useState<string>()
    const [value, setValue] = useState<number>()
    const { push } = useRouter()

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(+e.target.value)
    }

    const onHandleSubmit = async () => {
        try {
            const userId = JSON.parse(sessionStorage.getItem('user') as any).id as number

            const requestBody = {
                name,
                valuedAt: value,
                userId
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/art`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                toast('Arte criada com sucesso!', { type: 'success' })

                push('/')
            } else {
                toast('Falha ao criar arte. Tente novamente!', { type: 'error' })
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado!', { type: 'error' })
        }
    }

    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name && value) {
            onHandleSubmit()
        } else {
            toast('Campos não preenchidos!', { type: 'error' })
        }
    }

    return (
        <main>
            <Navbar />
            <div className="container mt-3 p-3 d-flex flex-column gap-3">
                <div>
                    <h2>Criar arte</h2>
                    <p>Publique a sua arte para todos artistas conferirem!</p>
                </div>
                <form onSubmit={onSubmitForm} className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input value={name} onChange={onChangeName} type="text" className="form-control" id="name" placeholder="Nome da sua arte" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="value" className="form-label">Valor</label>
                        <input type="number" value={value} onChange={onChangeValue} className="form-control" id="value" placeholder="Valor da sua arte" />
                    </div>
                    <button type="submit" className="btn btn-success">Criar</button>
                </form>
            </div>
        </main>
    )
}