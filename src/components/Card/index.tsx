import { TCard } from "@/types/Card/TCard";

export default function Card({ title, value, image, createdAt }: TCard) {
    function formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      }

    return (
        <div className="card" style={{ width: '18rem' }}>
            {image && <img src={image} className="card-img-top" alt="Imagem de uma arte publicada." />}
            {!image && <img style={{ width: '100%', height: '200px', objectFit: 'cover' }} src='https://www.pngkey.com/png/detail/233-2332677_ega-png.png' />}
            <div className="card-body d-flex flex-column gap-3">
                <h5 className="card-title">{title}</h5>
                <span className="badge text-bg-secondary align-self-start">Valor: R${value}</span>
                <a href="#" className="btn btn-primary">Comentar</a>
                <span>Criado em: {formatDate(new Date(createdAt))}</span>
            </div>
        </div>
    )
}