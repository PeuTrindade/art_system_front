import { TArtistCard } from "@/types/ArtistCard/TArtistCard";

export default function ArtistCard({ name, email, age, image, style }: TArtistCard) {
    return (
        <div className="card" style={{ width: '18rem' }}>
            {image && <img style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={image} className="card-img-top" alt="Imagem de uma arte publicada." />}
            {!image && <img style={{ width: '100%', height: '200px', objectFit: 'cover' }} src='https://www.pngkey.com/png/detail/233-2332677_ega-png.png' />}
            <div className="card-body d-flex flex-column gap-3">
                <div>
                    <h5 className="card-title">{`${name}, ${age} anos`}</h5>
                    <span>Email: {email}</span>
                </div>
                <span className="badge text-bg-secondary align-self-start">Estilo: {style}</span>
            </div>
        </div>
    )
}