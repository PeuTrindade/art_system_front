import Navbar from "@/components/Navbar";
import { ChangeEvent, useEffect, useState } from "react";
import io from 'socket.io-client'

export default function Chat() {
    const [message, setMessage] = useState<string>()
    const [messages, setMessages] = useState<any[]>([])
    const socket = io(process.env.NEXT_PUBLIC_SOCKET as string)

    const onSendMessage = () => {
        const userEmail = JSON.parse(sessionStorage.getItem('user') as any).email as string

        const messageData = {
            user: userEmail,
            message
        }

        socket.emit('chat', messageData);
    }

    const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages([...messages, msg])
        })
    }, [messages])

    return (
        <main>
            <Navbar />
            <div className="container mt-3 p-3 d-flex flex-column gap-3">
                <div>
                    <h2>Chat</h2>
                    <p>Interaja com outros artistas em tempo real!</p>
                </div>
                <div style={{ height: '500px'}} className="container border p-4 rounded-3 d-flex flex-column justify-content-between">
                    <div style={{ height: '400px', overflowY: 'auto' }} className="container">
                        {messages && messages.map((msg, key) => (
                          <p key={key} className="d-flex gap-2 align-items-center">
                            <span className="badge text-bg-secondary">{msg.user} enviou:</span>
                            {msg.message}
                          </p>
                        ))}
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <input value={message} onChange={onChangeMessage} type="text" className="form-control" placeholder="Envie uma mensagem" />
                        <button onClick={onSendMessage} className="btn btn-success">Enviar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}