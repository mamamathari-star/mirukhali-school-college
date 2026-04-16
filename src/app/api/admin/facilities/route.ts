import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const facilities = await prisma.facility.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json({ facilities })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const facility = await prisma.facility.create({
    data: { name: body.name, description: body.description, icon: body.icon, category: body.category || 'general', order: body.order || 0, active: true },
  })
  return NextResponse.json({ facility }, { status: 201 })
}
