import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const results = await prisma.result.findMany({
    orderBy: { createdAt: 'desc' },
    include: { student: { select: { name: true } } },
  })
  return NextResponse.json({ results })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()

  if (Array.isArray(body.results)) {
    const created = await prisma.result.createMany({ data: body.results })
    return NextResponse.json({ created: created.count }, { status: 201 })
  }

  const result = await prisma.result.create({
    data: {
      exam: body.exam, year: body.year, class: body.class, group: body.group,
      roll: body.roll, registration: body.registration,
      gpa: body.gpa ? parseFloat(body.gpa) : null,
      grade: body.grade, subjects: body.subjects,
      studentId: body.studentId || null,
      verified: body.verified || false,
    },
  })
  return NextResponse.json({ result }, { status: 201 })
}
