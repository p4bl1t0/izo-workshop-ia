import { copyFileSync, existsSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'src/lib/appointments.ts')
const backup = join(root, 'src/lib/appointments.ts.backup')
const flag = join(root, '.demo-5-active')

if (!existsSync(backup)) {
  console.error('No hay backup. ¿Corriste preparar:demo-5 antes?')
  process.exit(1)
}

copyFileSync(backup, target)
unlinkSync(backup)
if (existsSync(flag)) unlinkSync(flag)
console.log('Estado inicial restaurado.')
console.log('Ejecutá: npm test  (3 tests en verde)')
