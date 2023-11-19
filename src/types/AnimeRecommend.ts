export interface AnimeRecommend {
  mal_id: number
  url: string
  images: {
    webp: {
      image_url: string
    }
  }
  title: string
}

export interface DataAnimeRecommend {
  data: AnimeRecommend[]
}
