export function DiagramBlock({ content, label }: { content: string; label?: string }) {
  return (
    <div className="border border-[#0077C8]/30 bg-[#0077C8]/08 p-5">
      {label && (
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7ec8f5]">{label}</p>
      )}
      <pre className="overflow-x-auto font-mono text-sm leading-6 text-white/90 whitespace-pre">{content}</pre>
    </div>
  )
}

export function Card({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'gold' | 'blue'
}) {
  const styles = {
    default: 'border-white/10 bg-white/[0.03]',
    gold: 'border-[#D9B466]/35 bg-[#D9B466]/10',
    blue: 'border-[#0077C8]/40 bg-[#0077C8]/10',
  }
  return <div className={`border p-5 md:p-6 ${styles[variant]}`}>{children}</div>
}

export function TakeawayGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="border-l-2 border-[#0077C8] bg-white/[0.04] px-4 py-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9B466]">Idea clave</span>
          <p className="mt-2 text-sm font-semibold leading-6 text-white">{item}</p>
        </div>
      ))}
    </div>
  )
}

export function MetaBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bfbfbf]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string
  title: string
  summary?: string
}) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B466]">{eyebrow}</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {summary && <p className="mt-5 max-w-xl text-lg leading-7 text-[#bfbfbf]">{summary}</p>}
    </>
  )
}

export function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-[#D9B466] bg-[#D9B466]/10 px-6 py-5 text-lg font-semibold leading-8 text-white">
      {children}
    </blockquote>
  )
}

export function TeacherNotesBlock({
  title = 'Notas del docente',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-[#D9B466]/35 bg-[#D9B466]/10 p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#D9B466]">{title}</p>
      <div className="mt-3 grid gap-2 text-sm leading-6 text-white/85">{children}</div>
    </div>
  )
}
