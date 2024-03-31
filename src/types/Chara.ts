export interface Chara {
  character: {
    mal_id: number
    url: string
    images: {
      webp: {
        image_url: string
      }
      jpg: {
        image_url: string
      }
    }
    name: string
  }
  role: string
  voice_actors: Array<{
    person: {
      mal_id: number
      url: string
      images: {
        jpg: {
          image_url: string
        }
      }
      name: string
    }
    language: string
  }>
}

export interface Charas {
  data: Chara[]
}
