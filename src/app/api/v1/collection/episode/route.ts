import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function PATCH(req: NextRequest) {
  const { id, episode }: { id: number; episode: number } = await req.json()

  const update = await prisma?.collection.update({
    where: {
      id,
    },
    data: {
      episode,
    },
  })

  if (!update) return NextResponse.json({ status: 400, isUpdated: false })
  return NextResponse.json({ status: 200, isUpdated: true })
}
