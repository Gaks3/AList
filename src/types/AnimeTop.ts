interface GenreProps {
  name: string
}

interface StudiosProps {
  name: string
}

export interface AnimeTopProps {
  mal_id: number
  title: string
  images: {
    webp: {
      image_url: string
    }
  }
  score: number
  airing: boolean
  type: string
  season: string
  year: number
  status: string
  episodes: string
  rating: string
  genres: GenreProps[]
  popularity: number
  duration: string
  studios: StudiosProps[]
  aired: {
    from: string
    to: string
  }
  synopsis: string
  trailer: {
    youtube_id: string | undefined
  }
}

export interface AnimeDatas {
  data: AnimeTopProps[]
}

export interface AnimeData {
  data: AnimeTopProps
}

export default AnimeTopProps
