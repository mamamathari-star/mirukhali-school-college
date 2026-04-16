import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teachers = await prisma.teacher.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json({ teachers })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const teacher = await prisma.teacher.create({
    data: { name: body.name, designation: body.designation, subject: body.subject, qualification: body.qualification, phone: body.phone, email: body.email, order: body.order || 0, active: true },
  })
  return NextResponse.json({ teacher }, { status: 201 })
}
