import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const {
    mal_id,
    username,
    email,
    avatar,
    text,
    anime_title,
    rating,
  }: {
    mal_id: string
    username: string
    email: string
    avatar: string
    text: string
    anime_title: string
    rating: number
  } = await req.json()

  const create = await prisma.comment.create({
    data: {
      mal_id,
      username,
      email,
      avatar,
      text,
      anime_title,
      rating,
    },
  })

  if (!create) return NextResponse.json({ message: 'Error' }, { status: 500 })
  return NextResponse.json({ message: 'Success' }, { status: 200 })
}
