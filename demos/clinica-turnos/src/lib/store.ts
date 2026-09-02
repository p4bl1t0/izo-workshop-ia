export type Patient = {
  id: string
  name: string
}

export type Slot = {
  id: string
  startsAt: string
  occupied: boolean
}

export type Appointment = {
  id: string
  slotId: string
  userId: string
  note?: string
  createdAt: string
}

const patients: Patient[] = [
  { id: 'patient-1', name: 'Ana García' },
  { id: 'patient-2', name: 'Bruno López' },
]

const now = Date.now()
const hour = 60 * 60 * 1000

const slots: Slot[] = [
  { id: 'slot-1', startsAt: new Date(now + 2 * hour).toISOString(), occupied: false },
  { id: 'slot-2', startsAt: new Date(now + 3 * hour).toISOString(), occupied: false },
  { id: 'slot-3', startsAt: new Date(now + 24 * hour).toISOString(), occupied: false },
  { id: 'slot-4', startsAt: new Date(now + 25 * hour).toISOString(), occupied: false },
  { id: 'slot-past', startsAt: new Date(now - 2 * hour).toISOString(), occupied: false },
]

const appointments: Appointment[] = []

let appointmentSeq = 1

export function getPatients(): Patient[] {
  return patients
}

export function getSlots(): Slot[] {
  return slots
}

export function getSlotById(slotId: string): Slot | undefined {
  return slots.find((s) => s.id === slotId)
}

export function getAppointmentsByUser(userId: string): Appointment[] {
  return appointments.filter((a) => a.userId === userId)
}

export function countActiveAppointments(userId: string): number {
  const now = new Date()
  return appointments.filter((a) => {
    if (a.userId !== userId) return false
    const slot = slots.find((s) => s.id === a.slotId)
    return Boolean(slot && new Date(slot.startsAt) > now)
  }).length
}

export function createAppointmentRecord(input: {
  slotId: string
  userId: string
  note?: string
}): Appointment {
  const slot = getSlotById(input.slotId)
  if (!slot) {
    throw new Error('SLOT_NOT_FOUND')
  }
  if (slot.occupied) {
    throw new Error('SLOT_OCCUPIED')
  }

  slot.occupied = true
  const appointment: Appointment = {
    id: `appt-${appointmentSeq++}`,
    slotId: input.slotId,
    userId: input.userId,
    note: input.note,
    createdAt: new Date().toISOString(),
  }
  appointments.push(appointment)
  return appointment
}

/** Solo para tests: reinicia el store */
export function resetStoreForTests(): void {
  appointments.length = 0
  appointmentSeq = 1
  for (const slot of slots) {
    if (slot.id !== 'slot-past') {
      slot.occupied = false
    }
  }
}
