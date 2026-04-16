import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const student = await prisma.student.findUnique({ where: { id: params.id } })
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ student })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const student = await prisma.student.update({
    where: { id: params.id },
    data: { name: body.name, roll: body.roll, registration: body.registration, class: body.class, group: body.group, session: body.session, phone: body.phone, address: body.address, active: body.active },
  })
  return NextResponse.json({ student })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.student.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
