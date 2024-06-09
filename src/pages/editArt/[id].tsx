import Navbar from "@/components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function EditArt() {
    const [name, setName] = useState<string>()
    const [value, setValue] = useState<number>()
    const [image, setImage] = useState<any>()
    const { push, query } = useRouter()
    const artId = query.id as string
    
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(+e.target.value)
    }

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList
        const file = files[0]

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            setImage(formData)
        }
    }

    const updateImage = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/art/image/${artId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: image
            })

            if (response.ok) {
                push('/')
            } else {
                toast('Ocorreu um erro ao editar imagem!', { type: 'error' }) 
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado ao editar imagem!', { type: 'error' })
        }
    }

    const onHandleSubmit = async () => {
        try {
            const requestBody = {
                name,
                valuedAt: value
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/art/${artId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                toast('Arte editada com sucesso!', { type: 'success' })

                await updateImage()
            } else {
                toast('Falha ao editar arte. Tente novamente!', { type: 'error' })
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
                <h2>Editar arte</h2>
                <p>Edite sua arte publicada!</p>
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
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagem</label>
                    <input type="file" onChange={onChangeImage} className="form-control" id="image" placeholder="Imagem da sua arte" />
                </div>
                <button type="submit" className="btn btn-success">Editar</button>
            </form>
            </div>
        </main>
    )
}