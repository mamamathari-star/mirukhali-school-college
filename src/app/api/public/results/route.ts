import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const roll = searchParams.get('roll') || ''
  const registration = searchParams.get('registration') || ''
  const year = searchParams.get('year') || ''
  const exam = searchParams.get('exam') || ''

  if (!year || !exam) {
    return NextResponse.json({ error: 'সাল ও পরীক্ষার ধরন প্রয়োজন' }, { status: 400 })
  }

  const where: any = { year, exam }
  if (roll) where.roll = roll
  if (registration) where.registration = registration

  const results = await prisma.result.findMany({
    where,
    include: { student: { select: { name: true, roll: true } } },
  })

  return NextResponse.json({ results })
}
