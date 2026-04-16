import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || ''
  const where = { published: true, ...(category ? { category } : {}) }
  const items = await prisma.galleryItem.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ items })
}
