import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const students = await prisma.student.findMany({
    orderBy: [{ class: 'asc' }, { roll: 'asc' }],
  })
  return NextResponse.json({ students })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const student = await prisma.student.create({
    data: {
      name: body.name, roll: body.roll, registration: body.registration,
      class: body.class, group: body.group, session: body.session,
      phone: body.phone, address: body.address, active: true,
    },
  })
  return NextResponse.json({ student }, { status: 201 })
}
