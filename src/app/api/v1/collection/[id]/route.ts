import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function DELETE(
  req: NextRequest,
  route: { params: { id: string } }
) {
  const res = await prisma.collection.delete({
    where: {
      id: Number(route.params.id),
    },
  })

  if (!res) return NextResponse.json({ status: 400 })
  return NextResponse.json({ status: 200 })
}

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const res = await prisma.collection.findUnique({
    where: {
      id: Number(route.params.id),
    },
  })

  if (!res) return NextResponse.json({ status: 400 })
  return NextResponse.json({ data: res }, { status: 200 })
}
