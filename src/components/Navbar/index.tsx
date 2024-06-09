import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
    const [username, setUsername] = useState<string>()

    useEffect(() => {
        const userData = sessionStorage.getItem('user') as string

        if (userData) {
            const userName = JSON.parse(userData).name

            setUsername(userName)
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Olá, {username}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Artes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/artists">Artistas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/chat">Chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/createArt">Criar arte</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/artsFromUser">Minhas artes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/profile">Meu perfil</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}