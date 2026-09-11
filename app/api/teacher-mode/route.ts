import { createTeacherToken, validateTeacherKey, verifyTeacherToken } from '@/lib/teacher-auth.server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.TEACHER_MODE_KEY) {
    return NextResponse.json({ error: 'Modo docente no configurado.' }, { status: 503 })
  }

  let key = ''
  try {
    const body = await request.json()
    key = typeof body.key === 'string' ? body.key.trim() : ''
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  if (!validateTeacherKey(key)) {
    return NextResponse.json({ error: 'Clave incorrecta.' }, { status: 401 })
  }

  return NextResponse.json({ token: createTeacherToken() })
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')?.trim() ?? ''
  return NextResponse.json({ valid: verifyTeacherToken(token) })
}
