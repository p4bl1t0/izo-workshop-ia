import { copyFileSync, existsSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'src/lib/appointments.ts')
const backup = join(root, 'src/lib/appointments.ts.backup')
const source = join(root, 'estados/demo-5/appointments.ts')
const flag = join(root, '.demo-5-active')

if (!existsSync(backup)) {
  copyFileSync(target, backup)
  console.log('Backup creado: src/lib/appointments.ts.backup')
}

copyFileSync(source, target)
writeFileSync(flag, 'demo-5\n')
console.log('Estado demo-5 activado.')
console.log('Ejecutá: npm test  (debe fallar 1 test de cupo)')
