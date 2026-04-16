import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ items })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const item = await prisma.galleryItem.create({
    data: { title: body.title, description: body.description, imageUrl: body.imageUrl, category: body.category || 'general', published: body.published !== false },
  })
  return NextResponse.json({ item }, { status: 201 })
}
