import path from 'path'
import fs from 'fs/promises'

export async function saveUploadedFile(
  file: File,
  subfolder = 'general'
): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder)
  await fs.mkdir(uploadDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name) || '.jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const filepath = path.join(uploadDir, filename)

  await fs.writeFile(filepath, buffer)
  return `/uploads/${subfolder}/${filename}`
}
