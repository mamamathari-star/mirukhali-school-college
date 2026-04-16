import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const admission = await prisma.admissionRequest.create({
      data: {
        name: body.name,
        dob: new Date(body.dob),
        fatherName: body.fatherName,
        motherName: body.motherName,
        phone: body.phone,
        address: body.address,
        applyingClass: body.applyingClass,
        group: body.group,
        session: body.session,
      },
    })
    return NextResponse.json({ success: true, id: admission.id })
  } catch (e) {
    return NextResponse.json({ error: 'আবেদন ব্যর্থ হয়েছে' }, { status: 500 })
  }
}
