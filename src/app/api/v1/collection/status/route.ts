import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { Status } from '@prisma/client'

export async function PATCH(req: NextRequest) {
  const { id, status }: { id: number; status: Status } = await req.json()

  const update = await prisma?.collection.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })

  if (!update) return NextResponse.json({ status: 400, isUpdated: false })
  return NextResponse.json({ status: 200, isUpdated: true })
}
