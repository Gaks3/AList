// export enum Status {
//   'WATCHING',
//   'PLAN',
//   'HOLD',
//   'DROPPED',
// }

import { Status } from '@prisma/client'

export type Collection = {
  id: number
  mal_id: string
  email: string
  add_date: Date
  complete_date: Date | null
  status: Status
  episode: number
  image: string
  title: string
  rewatch: number
}

export type Collections = Collection[]
