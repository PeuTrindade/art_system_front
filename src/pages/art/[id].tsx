import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

export default function Art() {
    const [feedback, setFeedback] = useState<string>()
    const [feedbacks, setFeedbacks] = useState<string[]>()
    const { query, push } = useRouter()
    const artId = query.id as string

    const onChangeFeedback = (e: ChangeEvent<HTMLInputElement>) => {
        setFeedback(e.target.value)
    }

    const getFeedbacks = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/feedback/${artId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })

            if (response.ok) {
                const data = await response.json()

                setFeedbacks(data.feedbacks)
            } else {
                toast('Falha ao criar feedback. Tente novamente!', { type: 'error' })
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado!', { type: 'error' })
        }
    }, [artId])

    useEffect(() => {
        getFeedbacks()
    }, [getFeedbacks])

    const onSendFeedback = async () => {
        try {
            const userId = JSON.parse(sessionStorage.getItem('user') as any).id as number

            const requestBody = {
                feedback,
                artId: +artId,
                userId
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                toast('Feedback criado com sucesso!', { type: 'success' })

                push('/')
            } else {
                toast('Falha ao criar feedback. Tente novamente!', { type: 'error' })
            }
        } catch (error) {
            toast('Ocorreu um erro inesperado!', { type: 'error' })
        }
    }

    return (
        <main>
            <Navbar />
            <div className="container mt-3 p-3 d-flex flex-column gap-3">
                <div>
                    <h2>Comente na arte!</h2>
                    <p>Deixe um feedback para esse artista!</p>
                </div>
                <div style={{ height: '500px'}} className="container border p-4 rounded-3 d-flex flex-column justify-content-between">
                    <div style={{ height: '400px', overflowY: 'auto' }} className="container">
                        {feedbacks && feedbacks.map((fb: any, key) => (
                            <p key={key}>{fb.feedback}</p>
                        ))}
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <input value={feedback} onChange={onChangeFeedback} type="text" className="form-control" placeholder="Envie um feedback" />
                        <button onClick={onSendFeedback} className="btn btn-success">Enviar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}