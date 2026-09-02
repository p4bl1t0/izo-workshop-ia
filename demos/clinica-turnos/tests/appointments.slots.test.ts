import { describe, expect, it } from 'vitest'
import { listAvailableSlots } from '@/lib/appointments'

describe('appointments slots', () => {
  it('no incluye slots pasados ni ocupados', () => {
    const slots = listAvailableSlots()
    const now = new Date()
    for (const slot of slots) {
      expect(new Date(slot.startsAt) > now).toBe(true)
      expect(slot.occupied).toBe(false)
    }
    expect(slots.some((s) => s.id === 'slot-past')).toBe(false)
  })
})
