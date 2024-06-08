import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Art Sys</a>
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
                    </ul>
                </div>
            </div>
        </nav>
    )
}