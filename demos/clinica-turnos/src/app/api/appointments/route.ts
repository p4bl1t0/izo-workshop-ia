import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserId } from '@/lib/auth'

/** POST pendiente de implementación (demos 1 y 4) */
export async function POST(_request: NextRequest) {
  try {
    getUserId(_request)
    return NextResponse.json(
      { error: 'POST /api/appointments not implemented yet' },
      { status: 501 },
    )
  } catch {
    return NextResponse.json({ error: 'Missing X-User-Id header' }, { status: 401 })
  }
}
