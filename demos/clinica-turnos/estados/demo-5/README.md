# Estado Demo 5 — test en rojo

Este estado simula un agente que implementó `createAppointment` **sin** la regla de cupo (máximo 3 reservas activas).

## Activar (docente)

```bash
npm run preparar:demo-5
npm test
```

Esperado: **falla** `rechaza la cuarta reserva activa del mismo usuario`.

## Corregir con el agente

El fix esperado en `src/lib/appointments.ts`:

```ts
if (countActiveAppointments(userId) >= 3) {
  throw new Error('ACTIVE_LIMIT_EXCEEDED')
}
```

(antes de `createAppointmentRecord`)

## Restaurar

```bash
npm run reset:demo-5
npm test
```

Vuelven **3 tests** en verde; el test de cupo queda skip hasta la próxima demo 5.
