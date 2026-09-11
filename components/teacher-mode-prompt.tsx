'use client'

import { useEffect, useRef, useState } from 'react'

export function TeacherModePrompt({
  open,
  error,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean
  error: string
  loading: boolean
  onClose: () => void
  onSubmit: (key: string) => void
}) {
  const [key, setKey] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      setKey('')
      return
    }
    inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-white/15 bg-[#1f2023] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="teacher-mode-title"
        aria-modal="true"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B466]">Acceso restringido</p>
        <h2 id="teacher-mode-title" className="mt-2 text-xl font-bold text-white">
          Modo docente
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#bfbfbf]">
          Ingresá la clave del taller para ver notas de facilitación, tiempos y guiones.
        </p>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!loading && key.trim()) onSubmit(key.trim())
          }}
        >
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Clave</span>
            <input
              ref={inputRef}
              type="password"
              autoComplete="off"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={loading}
              className="mt-2 w-full border border-white/15 bg-[#27282B] px-3 py-2.5 text-sm text-white outline-none ring-[#D9B466]/40 focus:ring-2 disabled:opacity-60"
              placeholder="Clave del docente"
            />
          </label>
          {error && <p className="text-sm font-medium text-[#f87171]">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:bg-white/5 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="rounded-md bg-[#D9B466] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#27282B] transition hover:bg-[#e5c47a] disabled:opacity-50"
            >
              {loading ? 'Verificando…' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
