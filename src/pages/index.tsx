import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { TArt } from "@/types/Art/TArt";

export default function Home() {
  const [arts, setArts] = useState<TArt[]>([])

  const getAllArts = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/art`, {
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
    getAllArts()
  }, [getAllArts])

  return (
    <main>
        <Navbar />
        <div className="container mt-3 p-3 d-flex flex-column gap-3">
          <div>
            <h2>Artes</h2>
            <p>Confira todas as artes publicadas!</p>
          </div>
          <div className="d-flex flex-wrap gap-3">
            {arts && arts.map((art, key) => (
              <Card key={key} id={art.id} title={art.name} value={art.valuedAt} image={undefined} createdAt={art.createdAt} />
            ))}
          </div>
        </div>
    </main>
  );
}
