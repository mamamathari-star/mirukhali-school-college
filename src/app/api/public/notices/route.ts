import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = parseInt(searchParams.get('perPage') || '10')

  const where = { published: true, ...(category ? { category } : {}) }
  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      where, orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * perPage, take: perPage,
      select: { id: true, title: true, category: true, publishedAt: true },
    }),
    prisma.notice.count({ where }),
  ])

  return NextResponse.json({ notices, total, page, totalPages: Math.ceil(total / perPage) })
}
