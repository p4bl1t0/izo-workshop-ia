# Demo 4 — Implementar solo el paso 1

**Cuándo:** Solo si el walkthrough terminó temprano. **Duración:** 5 min máx.  
**Proyecto:** `demos/clinica-turnos` — misma sesión que demo 3 **solo si** el plan fue aprobado.

---

## Prompt

```
Implementá únicamente el paso 1 del plan que acabamos de aprobar.

Reglas:
- Cambios mínimos: solo archivos listados en el paso 1
- No refactorices código existente
- No toques src/lib/auth.ts
- Al terminar, ejecutá: npm test
- Mostrame un resumen de diffs y el resultado de los tests

Si el paso 1 no estaba claro, pedime confirmación antes de editar.
```

---

## Si no corriste demo 3 en vivo

Usar este paso 1 fijo:

```
Implementá solo esto (paso 1):

1. Agregar función createAppointment en src/lib/appointments.ts con validación Zod del body (slotId, opcional note)
2. Agregar handler POST en src/app/api/appointments/route.ts que use getUserId() y createAppointment
3. Un test: POST válido devuelve 201 y persiste la reserva

No implementes cupo de 3 ni conflicto de slot todavía. No toques auth. Corré npm test al final.
```

---

## Qué observar

- ¿El diff es acotado o reformatea medio repo?
- ¿Corre tests o solo dice “debería pasar”?
- ¿Toca auth sin pedirlo?

---

## Cierre

> Supervisar el diff es parte del oficio, no molestia.
