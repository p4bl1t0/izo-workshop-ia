import { z } from 'zod'
import {
  createAppointmentRecord,
  getSlotById,
  getSlots,
  type Appointment,
} from '@/lib/store'

export const createAppointmentSchema = z.object({
  slotId: z.string().min(1),
  note: z.string().max(140).optional(),
})

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>

export function listAvailableSlots(now = new Date()) {
  return getSlots().filter((slot) => {
    const startsAt = new Date(slot.startsAt)
    return !slot.occupied && startsAt > now
  })
}

/**
 * Estado inicial del workshop: POST no implementado a nivel de negocio.
 * Demo 4 implementa esto. Demo 5 usa estados/demo-5/appointments.ts (sin cupo).
 */
export function createAppointment(
  _userId: string,
  _input: CreateAppointmentInput,
): Appointment {
  throw new Error('NOT_IMPLEMENTED')
}

export function assertSlotBookable(slotId: string, now = new Date()): void {
  const slot = getSlotById(slotId)
  if (!slot) {
    throw new Error('SLOT_NOT_FOUND')
  }
  if (new Date(slot.startsAt) <= now) {
    throw new Error('SLOT_IN_PAST')
  }
  if (slot.occupied) {
    throw new Error('SLOT_OCCUPIED')
  }
}

export function persistAppointment(
  userId: string,
  input: CreateAppointmentInput,
): Appointment {
  assertSlotBookable(input.slotId)
  return createAppointmentRecord({
    slotId: input.slotId,
    userId,
    note: input.note,
  })
}
