import { NextResponse } from 'next/server'
import { listAvailableSlots } from '@/lib/appointments'

export async function GET() {
  const slots = listAvailableSlots()
  return NextResponse.json({ slots })
}
