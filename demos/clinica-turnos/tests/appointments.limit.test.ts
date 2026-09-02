import { existsSync } from 'node:fs'
import { describe, expect, it, beforeEach } from 'vitest'
import { createAppointment } from '@/lib/appointments'
import { resetStoreForTests } from '@/lib/store'

const demo5Active = existsSync('.demo-5-active')

describe.skipIf(!demo5Active)('appointments limit — demo 5', () => {
  beforeEach(() => {
    resetStoreForTests()
  })

  it('rechaza la cuarta reserva activa del mismo usuario (CA3)', () => {
    const userId = 'user-demo-5'
    createAppointment(userId, { slotId: 'slot-1' })
    createAppointment(userId, { slotId: 'slot-2' })
    createAppointment(userId, { slotId: 'slot-3' })

    expect(() => createAppointment(userId, { slotId: 'slot-4' })).toThrow(/limit|cuarto|cupo|ACTIVE_LIMIT/i)
  })
})
