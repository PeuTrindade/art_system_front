import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "react-toastify"

export default function SignUp() {
    const [email, setEmail] = useState<string>()
    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [style, setStyle] = useState<string>('1')
    const [age, setAge] = useState<number>()
    const { push } = useRouter()

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    
    const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
        setAge(+e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setStyle(e.target.value)
    }

    const registerUser = async () => {
        try {
            const styleMatcher = {
                '1': 'design',
                '2': 'photography',
                '3': 'painting',
                '4': 'sculpture'
            }

            const formattedStyle = styleMatcher[style as '1' || '2' || '3' || '4']

            const requestBody = {
                name, 
                email,
                password,
                age,
                style: formattedStyle
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            const data = await response.json()

            if (response.ok) {
                toast('Cadastro realizado com sucesso!', { type: 'success' })
                
                push('/login')
            } else {
                if (data.message == 'Email already exists. Please, try login!') {
                    toast('Email já em uso. Faça login!', { type: 'error' })
                } else {
                    toast('Ocorreu um erro ao cadastrar. Tente novamente!', { type: 'error' })
                }
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado!', { type: 'error' })
        }
    }

    const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email && password && name && style && age && confirmPassword) {
            if (password !== confirmPassword) {
                toast('Senhas incompatíveis!', { type: 'error' })
            } else {
                await registerUser()
            }
        } else {
            toast('Campos não preenchidos!', { type: 'error' })
        }
    }
    
    return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
        <form onSubmit={onHandleSubmit} className="w-[300px] border p-4 rounded-3">
            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input value={name} onChange={onChangeName} type="text" className="form-control" id="name" aria-describedby="name" placeholder="Digite seu nome" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={onChangeEmail} type="email" className="form-control" id="email" aria-describedby="email" placeholder="Digite seu email" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="age">Idade</label>
                <input value={age} onChange={onChangeAge} type="number" className="form-control" id="age" aria-describedby="age" placeholder="Insira sua idade" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="password">Senha</label>
                <input value={password} onChange={onChangePassword} type="password" className="form-control" id="password" placeholder="Digite sua senha" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input value={confirmPassword} onChange={onChangeConfirmPassword} type="password" className="form-control" id="confirmPassword" placeholder="Confirme sua senha" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="style">Estilo</label>
                <select value={style} onChange={onSelect} id="style" className="form-select" aria-label="style">
                    <option value='1'>Design</option>
                    <option value="2">Fotografia</option>
                    <option value="3">Pintura</option>
                    <option value="4">Escultura</option>
                </select>
            </div>
            <div className="d-flex flex-column gap-1 mt-3">
                <button type="submit" className="btn btn-success">Cadastrar</button>
            </div>
        </form>
    </div>)
}