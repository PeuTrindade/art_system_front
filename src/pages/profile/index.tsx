import Navbar from "@/components/Navbar";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function Profile() {
    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [style, setStyle] = useState<string>()
    const [age, setAge] = useState<number>()
    const [image, setImage] = useState<any>()
    const { push } = useRouter()
    
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
        setAge(+e.target.value)
    }

    const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setStyle(e.target.value)
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
            const userId = JSON.parse(sessionStorage.getItem('user') as any).id as number

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/image/${userId}`, {
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

    const updateUser = async () => {
        try {
            const userId = JSON.parse(sessionStorage.getItem('user') as any).id as number

            const styleMatcher = {
                '1': 'design',
                '2': 'photography',
                '3': 'painting',
                '4': 'sculpture'
            }

            const formattedStyle = styleMatcher[style as '1' || '2' || '3' || '4']

            const requestBody = {
                name, 
                password,
                age,
                style: formattedStyle
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                      'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                toast('Dados atualizados com sucesso!', { type: 'success' })
                
                await updateImage()
            } else {
                toast('Ocorreu um erro ao atualizar. Tente novamente!', { type: 'error' })
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado!', { type: 'error' })
        }
    }

    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name && password && age && style) {
            updateUser()
        } else {
            toast('Campos não preenchidos!', { type: 'error' })
        }
    }

    return (
        <main>
            <Navbar />
            <div className="container mt-3 p-3 d-flex flex-column gap-3">
            <div>
                <h2>Editar perfil</h2>
                <p>Edite seu perfil!</p>
            </div>
            <form onSubmit={onSubmitForm} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input value={name} onChange={onChangeName} type="text" className="form-control" id="name" placeholder="Seu nome" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input type="password" value={password} onChange={onChangePassword} className="form-control" id="password" placeholder="Sua senha" />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Idade</label>
                    <input type="number" value={age} onChange={onChangeAge} className="form-control" id="age" placeholder="Sua idade" />
                </div>
                <div className="mb-3">
                    <label htmlFor="style">Estilo</label>
                    <select value={style} onChange={onSelect} id="style" className="form-select" aria-label="style">
                        <option value='1'>Design</option>
                        <option value="2">Fotografia</option>
                        <option value="3">Pintura</option>
                        <option value="4">Escultura</option>
                    </select>
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