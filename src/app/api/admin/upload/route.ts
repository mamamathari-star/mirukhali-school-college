import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { saveUploadedFile } from '@/lib/uploadHandler'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const subfolder = (formData.get('subfolder') as string) || 'general'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const url = await saveUploadedFile(file, subfolder)
  return NextResponse.json({ url })
}
