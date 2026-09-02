import { NextResponse } from 'next/server'
import { getUserId } from '@/lib/auth'
import { getPatients } from '@/lib/store'

export async function GET(request: Request) {
  try {
    getUserId(request as import('next/server').NextRequest)
    const patients = getPatients()
    return NextResponse.json({ patients })
  } catch {
    return NextResponse.json({ error: 'Missing X-User-Id header' }, { status: 401 })
  }
}
