import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const { push } = useRouter()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const authUser = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                const userToken = data.token

                toast('Login realizado com sucesso!', { type: 'success' })

                Cookies.set('token', userToken)

                push('/')
            } else {
                if (data.message == 'Invalid email or password!') {
                    toast('Credenciais inválidas!', { type: 'error' })
                } else if (data.message == 'User does not exists!') {
                    toast('Usuário não encontrado!', { type: 'error' })
                }
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado!', { type: 'error' })
        }
    }

    const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email && password) {
            await authUser()
        } else {
            toast('Campos não preenchidos!', { type: 'error' })
        }
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <form onSubmit={onHandleSubmit} className="w-[300px] border p-4 rounded-3">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={onChangeEmail} type="email" className="form-control" id="email" aria-describedby="email" placeholder="Digite seu email" />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password">Senha</label>
                    <input value={password} onChange={onChangePassword} type="password" className="form-control" id="password" placeholder="Digite sua senha" />
                </div>
                <div className="d-flex flex-column gap-1 mt-3">
                    <button type="submit" className="btn btn-success">Entrar</button>
                    <hr />
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
  