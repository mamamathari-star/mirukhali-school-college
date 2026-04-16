import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateCertificateId, generateVerifyHash } from '@/lib/certificate'
import { generateQRCode } from '@/lib/qrcode'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const certificates = await prisma.certificate.findMany({
    orderBy: { issuedAt: 'desc' },
    include: {
      student: { select: { name: true, roll: true } },
      result: { select: { exam: true, year: true, gpa: true } },
    },
  })
  return NextResponse.json({ certificates })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()

  const result = await prisma.result.findUnique({ where: { id: body.resultId }, include: { student: true } })
  if (!result) return NextResponse.json({ error: 'Result not found' }, { status: 404 })

  const certId = generateCertificateId()
  const verifyHash = generateVerifyHash(certId, result.studentId || 'unknown', result.id)
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify/${verifyHash}`
  const qrCode = await generateQRCode(verifyUrl)

  const certificate = await prisma.certificate.create({
    data: {
      certificateId: certId,
      studentId: result.studentId,
      resultId: result.id,
      type: body.type || 'result',
      verifyHash,
      qrCode,
      isValid: true,
    },
  })
  return NextResponse.json({ certificate }, { status: 201 })
}
