import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(req: NextRequest) {
  const {
    mal_id,
    email,
    title,
    image,
  }: {
    mal_id: string
    email: string
    title: string
    image: string
  } = await req.json()
  const data = { mal_id, email, title, image }

  const create = await prisma?.collection.create({ data })

  if (!create) return NextResponse.json({ status: 400, isCreated: false })
  return NextResponse.json({ status: 200, isCreated: true })
}
