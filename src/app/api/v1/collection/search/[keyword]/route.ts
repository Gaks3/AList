import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(
  req: NextRequest,
  route: { params: { keyword: string } }
) {
  const sortDate: any = req.nextUrl.searchParams.get('date')
  const sortStatus: any = req.nextUrl.searchParams.get('status')

  const where: { title: { contains: string }; status?: { equals: any } } = {
    title: {
      contains: route.params.keyword,
    },
  }
  if (sortStatus) where.status = { equals: sortStatus }

  const orderBy = []
  if (sortDate) orderBy.push({ add_date: sortDate })

  const res = await prisma.collection.findMany({
    where,
    orderBy,
  })

  if (res.length === 0)
    return NextResponse.json({ message: 'Data not found' }, { status: 404 })
  return NextResponse.json({ data: res }, { status: 200 })
}
