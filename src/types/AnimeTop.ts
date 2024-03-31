import PaginationProps from './Pagination'

interface GenreProps {
  name: string
  mal_id: number
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
    jpg: {
      large_image_url: string
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
    string: string
  }
  synopsis: string
  trailer: {
    youtube_id: string | undefined
  }
  title_english: string
  title_japanese: string
  title_synonyms: Array<string>
  source: string
  rank: number
  producers: Array<{
    name: string
  }>
  licensors: Array<{ name: string }>
  themes: Array<{ name: string }>
  streaming: Array<{ name: string; url: string }>
  scored_by: number
  members: number
  favorites: number
  theme: {
    openings: Array<string>
    endings: Array<string>
  }
}

export interface AnimeDatas {
  data: AnimeTopProps[]
}

export interface AnimeData {
  data: AnimeTopProps
}

export interface AnimeDataFull extends AnimeDatas {
  pagination: PaginationProps
}

export default AnimeTopProps
