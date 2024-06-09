import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import MyArtCard from "@/components/MyArtCard";

export default function ArtsFromUser() {
    const [arts, setArts] = useState<any[]>([])

    const getArts = useCallback(async () => {
        try {
          const userId = JSON.parse(sessionStorage.getItem('user') as any).id as number

          const response = await fetch(`${process.env.NEXT_PUBLIC_API}/art/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
          })
    
          if (response.ok) {
            const data = await response.json()
            const reversedArts = [...data.arts].reverse()
    
            setArts(reversedArts)
          } else {
            toast('Falha ao buscar artes. Tente novamente!', { type: 'error' })
          }
        } catch (error) {
          toast('Ocorreu um erro inesperado. Tente novamente!', { type: 'error' })
        }
      }, [])
    
      useEffect(() => {
        getArts()
      }, [getArts])

    return (
        <main>
            <Navbar />
            <div className="container mt-3 p-3 d-flex flex-column gap-3">
            <div>
                <h2>Minhas artes</h2>
                <p>Confira todas as suas artes publicadas!</p>
            </div>
            <div className="d-flex flex-wrap gap-3">
                {arts && arts.map((art, key) => (
                    <MyArtCard key={key} id={art.id} title={art.name} value={art.valuedAt} image={art.image ? `${process.env.NEXT_PUBLIC_API}/${art.image?.replace('uploads/', '')}` : undefined} createdAt={art.createdAt} />
                ))}
            </div>
            </div>
        </main>
    )
}