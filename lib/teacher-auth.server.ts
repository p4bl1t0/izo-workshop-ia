import 'server-only'
import crypto from 'node:crypto'

const TOKEN_PAYLOAD = 'izo-teacher-v1'

function getSigningSecret(): string {
  return process.env.TEACHER_MODE_SECRET || process.env.TEACHER_MODE_KEY || ''
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export function validateTeacherKey(key: string): boolean {
  const expected = process.env.TEACHER_MODE_KEY
  if (!expected || !key) return false
  return timingSafeEqual(key, expected)
}

export function createTeacherToken(): string {
  const secret = getSigningSecret()
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update(TOKEN_PAYLOAD).digest('hex')
}

export function verifyTeacherToken(token: string): boolean {
  const expected = createTeacherToken()
  if (!expected || !token) return false
  return timingSafeEqual(token, expected)
}
