import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export function generateCertificateId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 900000) + 100000
  return `MHC-${year}-${random}`
}

export function generateVerifyHash(certificateId: string, studentId: string, resultId: string): string {
  const data = `${certificateId}-${studentId}-${resultId}-${Date.now()}`
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 32)
}

export function generateUUID(): string {
  return uuidv4()
}
