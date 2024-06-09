import Navbar from "@/components/Navbar"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Cookies from 'js-cookie';
import { TArtist } from "@/types/Artist/TArtist";
import ArtistCard from "@/components/ArtistCard";

const Artists = () => {
    const [artists, setArtists] = useState<TArtist[]>([])

    const getAllArtists = useCallback(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get('token')}`
          }
        })
  
        if (response.ok) {
          const data = await response.json()
  
          setArtists(data.users)
        } else {
          toast('Falha ao buscar artistas. Tente novamente!', { type: 'error' })
        }
      } catch (error) {
        toast('Ocorreu um erro inesperado. Tente novamente!', { type: 'error' })
      }
    }, [])
  
    useEffect(() => {
        getAllArtists()
    }, [getAllArtists])

    return (
        <main>
            <Navbar />
            <div className="container mt-3 p-3 d-flex flex-column gap-3">
            <div>
                <h2>Artistas</h2>
                <p>Confira todos os artistas cadastrados!</p>
            </div>
            <div className="d-flex flex-wrap gap-3">
                {artists && artists.map((artist, key) => (
                    <ArtistCard age={artist.age} email={artist.email} image={artist.image ? `${process.env.NEXT_PUBLIC_API}/${artist.image?.replace('uploads/', '')}` : undefined} name={artist.name} style={artist.style} key={key} />
                ))}
            </div>
            </div>
        </main>
    )
}

export default Artists