# Arquitectura — Clínica Turnos (demo)

```
src/
  app/api/
    patients/route.ts      GET pacientes (ejemplo existente)
    appointments/
      route.ts             POST reservas (pendiente en estado inicial)
      slots/route.ts       GET slots disponibles
  lib/
    auth.ts                X-User-Id
    store.ts               datos in-memory
    appointments.ts        reglas de negocio
tests/
  patients.test.ts
  appointments.slots.test.ts
  appointments.limit.test.ts   (activo solo tras preparar:demo-5)
```

Flujo de una reserva:

```
POST /api/appointments
  → getUserId()
  → createAppointment(userId, body)
  → store (slots + appointments)
```
