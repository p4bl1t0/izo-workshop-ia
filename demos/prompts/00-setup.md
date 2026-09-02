# Setup — antes de las demos en vivo

## 1. Instalar el proyecto base

```bash
cd demos/clinica-turnos
npm install
npm test
```

Salida esperada: **3 tests en verde**.

## 2. Abrir en el IDE

- Carpeta a abrir: `demos/clinica-turnos` (no la raíz del workshop).
- Verificar que el agente vea: `AGENTS.md`, `SPEC.md`, `src/`, `tests/`.

## 3. Preparar sesiones del agente

| Demo | Sesión |
|------|--------|
| 01 — prompt pobre | **Nueva** (chat vacío) |
| 01 — prompt contextualizado | **Otra nueva** (no el mismo hilo) |
| 03 — plan | **Nueva** |
| 04 — implementar | Misma que 03 solo si aprobaste el plan |

## 4. Demo 5 (opcional)

Solo si vas a mostrar tests en rojo:

```bash
cd demos/clinica-turnos
npm run preparar:demo-5
npm test   # debe fallar 1 test (cupo de 3 reservas)
```

Para volver al estado inicial:

```bash
npm run reset:demo-5
npm test
```

## 5. Demo 8 (MCP)

Requiere MCP de GitHub o filesystem **ya configurado** en Cursor. No configurar en vivo durante los 8 minutos de MCP.
