# Demo 5 — Ejecutar tests y corregir

**Cuándo:** Consulta o si un test falló en demo 4. **Duración:** 4 min.  
**Proyecto:** `demos/clinica-turnos` en estado **rojo**

---

## Preparar estado (docente, antes de mostrar)

```bash
cd demos/clinica-turnos
npm run preparar:demo-5
npm test   # 1 test debe fallar: cupo de 3 reservas
```

Ver `clinica-turnos/estados/demo-5/README.md`.

---

## Prompt

```
Ejecutá npm test en este proyecto.

Para cada test que falle:
1. Explicá la causa en una frase (regla de negocio vs bug de implementación)
2. Corregí el código de producción con el cambio mínimo
3. No borres ni debilites el test
4. Volvé a correr npm test

Máximo 3 intentos. Si después de 3 intentos sigue rojo, explicá qué falta y pará.

No modifiques src/lib/auth.ts.
```

---

## Señal de alerta (parar la demo)

Si el agente:

- Borra el test → **parar** y hablar 30 s de integridad
- Cambia la expectativa del test para que pase → mismo tratamiento
- Agrega `skip` al test → rechazar el diff

---

## Después de la demo

```bash
npm run reset:demo-5
npm test
```

---

## Cierre

> Los tests no tienen ego. El agente a veces sí.
