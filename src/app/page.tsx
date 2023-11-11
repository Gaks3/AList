import AList from './components/AList'

interface Webp {
  image_url: string
}

interface AnimeTopData {
  mal_id: number
  title: string
  images: {
    webp: Webp
  }
}

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime`)
  const anime = await res.json()

  return (
    <div>
      <h1>Paling Populer</h1>
      <div className="grid grid-cols-3 gap-3">
        {anime.data.map((data: AnimeTopData) => {
          // prettier-ignore
          return <AList title={data.title} images={data.images.webp.image_url} key={data.mal_id}/>
        })}
      </div>
    </div>
  )
}
