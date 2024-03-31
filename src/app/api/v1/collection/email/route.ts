import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json()
  const sortDate: any | null = req.nextUrl.searchParams.get('date')
  const sortStatus: string | null = req.nextUrl.searchParams.get('status')

  const where: { email: string; status?: { equals: any } } = {
    email,
  }
  if (sortStatus) where.status = { equals: sortStatus }

  const orderBy = []
  if (sortDate) orderBy.push({ add_date: sortDate })

  const ress = await prisma.collection.findMany({
    where,
    orderBy,
  })

  if (ress.length == 0)
    return NextResponse.json({ message: 'Data not found' }, { status: 404 })
  return NextResponse.json({ data: ress }, { status: 200 })
}
