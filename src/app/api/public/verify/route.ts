import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || ''
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''
  const userAgent = req.headers.get('user-agent') || ''

  if (!query) {
    return NextResponse.json({ valid: false, message: 'কোড দিন' })
  }

  const certificate = await prisma.certificate.findFirst({
    where: {
      OR: [{ certificateId: query }, { verifyHash: query }],
      isValid: true,
    },
    include: {
      student: { select: { name: true, roll: true, class: true } },
      result: { select: { exam: true, year: true, gpa: true, grade: true } },
    },
  })

  await prisma.verificationLog.create({
    data: {
      certificateId: certificate?.id,
      roll: certificate?.student?.roll,
      ip,
      userAgent,
      success: !!certificate,
    },
  })

  if (!certificate) {
    return NextResponse.json({ valid: false, message: 'সনদ পাওয়া যায়নি বা অবৈধ' })
  }

  return NextResponse.json({ valid: true, certificate })
}
