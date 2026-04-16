import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const members = await prisma.committeeMember.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json({ members })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const member = await prisma.committeeMember.create({
    data: { name: body.name, designation: body.designation, role: body.role, phone: body.phone, email: body.email, order: body.order || 0, active: true },
  })
  return NextResponse.json({ member }, { status: 201 })
}
