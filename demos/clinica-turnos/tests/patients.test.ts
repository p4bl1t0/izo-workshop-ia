import { describe, expect, it } from 'vitest'
import { getPatients } from '@/lib/store'

describe('patients', () => {
  it('devuelve al menos un paciente', () => {
    const patients = getPatients()
    expect(patients.length).toBeGreaterThanOrEqual(1)
    expect(patients[0]).toHaveProperty('id')
    expect(patients[0]).toHaveProperty('name')
  })
})
