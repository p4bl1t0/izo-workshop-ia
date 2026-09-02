# SPEC.md — Reservas de turnos (MVP demo)

## Producto

API para que un paciente autenticado reserve turnos sobre slots predefinidos.

## Auth

- Header obligatorio: `X-User-Id` (string)
- Sin login real en el MVP

## En alcance

- Listar slots disponibles (futuros y libres)
- Crear reserva sobre un slot libre (`POST /api/appointments`)
- Listar reservas del usuario (futuro; no requerido en demo 1–4)

## Fuera de alcance

- Cancelación, pagos, notificaciones, panel admin, base de datos real

## Reglas de negocio (obligatorias)

1. Un slot no puede tener más de una reserva activa.
2. Un usuario no puede tener más de **3** reservas activas (futuras).
3. No se puede reservar un slot cuya `startsAt` sea anterior a ahora.
4. Slot inexistente → 404.
5. Slot ocupado → 409.
6. Cuarto intento de reserva del mismo usuario → 400 con mensaje claro.

## Criterios de aceptación (tests)

- **CA1:** listar slots no incluye pasados ni ocupados.
- **CA2:** POST válido crea reserva y marca slot ocupado.
- **CA3:** cuarto POST del mismo usuario falla (4xx).
- **CA4:** dos POST al mismo slot: uno gana, el otro 409.
- **CA5:** POST con slot en el pasado → 400.

## Contrato POST /api/appointments

```json
{ "slotId": "slot-1", "note": "opcional" }
```

Respuesta 201:

```json
{ "id": "...", "slotId": "slot-1", "userId": "...", "note": null }
```
