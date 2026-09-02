import { z } from 'zod'
import {
  createAppointmentRecord,
  countActiveAppointments,
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
 * ESTADO DEMO 5 — implementación incompleta a propósito.
 * Falta validar cupo de 3 reservas activas (el test appointments.limit debe fallar).
 */
export function createAppointment(
  userId: string,
  input: CreateAppointmentInput,
): Appointment {
  const parsed = createAppointmentSchema.parse(input)
  const slot = getSlotById(parsed.slotId)
  if (!slot) {
    throw new Error('SLOT_NOT_FOUND')
  }
  if (new Date(slot.startsAt) <= new Date()) {
    throw new Error('SLOT_IN_PAST')
  }
  if (slot.occupied) {
    throw new Error('SLOT_OCCUPIED')
  }
  // BUG: no se valida countActiveAppointments(userId) >= 3
  return createAppointmentRecord({
    slotId: parsed.slotId,
    userId,
    note: parsed.note,
  })
}

export function assertSlotBookable(slotId: string, now = new Date()): void {
  const slot = getSlotById(slotId)
  if (!slot) throw new Error('SLOT_NOT_FOUND')
  if (new Date(slot.startsAt) <= now) throw new Error('SLOT_IN_PAST')
  if (slot.occupied) throw new Error('SLOT_OCCUPIED')
}

export function persistAppointment(
  userId: string,
  input: CreateAppointmentInput,
): Appointment {
  return createAppointment(userId, input)
}

// export para que el agente pueda usarlo al corregir demo 5
export { countActiveAppointments }
