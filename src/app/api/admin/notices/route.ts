import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = 20

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage, take: perPage,
      include: { author: { select: { name: true } } },
    }),
    prisma.notice.count(),
  ])

  return NextResponse.json({ notices, total })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const notice = await prisma.notice.create({
    data: {
      title: body.title,
      content: body.content,
      category: body.category || 'general',
      published: body.published || false,
      publishedAt: body.published ? new Date() : null,
      authorId: (session.user as any).id,
    },
  })
  return NextResponse.json({ notice }, { status: 201 })
}
