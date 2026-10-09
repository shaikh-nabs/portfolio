import { releases } from '../data'
import Section from './Section'

const marks = {
  Added: { sign: '+', cls: 'text-ok' },
  Improved: { sign: '↑', cls: 'text-accent' },
  Fixed: { sign: '~', cls: 'text-warn' },
}

// '2025-01' → "1 yr 9 mo", counted up to today.
function durationSince(ym) {
  const [y, m] = ym.split('-').map(Number)
  const now = new Date()
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m)
  const yrs = Math.floor(months / 12)
  const mos = months % 12
  return [yrs && `${yrs} yr`, mos && `${mos} mo`].filter(Boolean).join(' ') || '1 mo'
}

function Release({ r }) {
  return (
    <article className="reveal group grid gap-4 border-b border-line py-9 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
      <div className="flex flex-row flex-wrap items-center gap-3 font-mono text-sm md:flex-col md:items-start">
        <span
          className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-semibold ${
            r.current ? 'border-accent text-accent' : 'border-line'
          }`}
        >
          {r.current && <span className="live-dot size-[7px] rounded-full bg-ok" />}
          {r.version}
          {r.tag && <span className="font-normal opacity-70">· {r.tag}</span>}
        </span>
        <time className="text-[13px] text-muted">{r.dates}</time>
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-[clamp(23px,2.4vw,30px)] leading-tight font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
          {r.title}
        </h3>
        <p className="mt-1 text-[15px] text-muted">
          {r.company} · {r.scope}
        </p>
        {r.since && (
          <p className="mt-4 inline-flex flex-wrap items-baseline gap-x-2 rounded-lg bg-accent/10 px-3 py-2 text-sm">
            <b className="font-display text-base font-extrabold text-accent">{durationSince(r.since)}</b>
            <span>of Flutter, {r.sinceNote}</span>
          </p>
        )}
        {r.groups.map((g) => (
          <div key={g.type}>
            <div className="mt-5 mb-2 font-mono text-xs font-semibold tracking-[0.08em] text-muted">### {g.type}</div>
            <ul className="grid max-w-[64ch] gap-2">
              {g.items.map((item) => (
                <li key={item} className="relative pl-6 leading-relaxed">
                  <span className={`absolute left-0 font-mono ${marks[g.type].cls}`}>{marks[g.type].sign}</span>
                  <span className="[&_b]:font-semibold" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}

// Newest is on top, so the branch forks off main at the bottom (after v2) and merges back at the top (into v3).
function BranchGraph() {
  return (
    <svg viewBox="0 0 120 170" className="branch-graph h-[170px] w-[120px]" aria-hidden="true">
      <line x1="16" y1="0" x2="16" y2="170" stroke="var(--c-line)" strokeWidth="2" strokeDasharray="4 6" />
      <path
        className="branch-path"
        d="M16 160 C16 135, 64 140, 64 115 L64 55 C64 30, 16 35, 16 10"
        fill="none"
        stroke="var(--c-warn)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="160" r="6" fill="var(--c-bg)" stroke="var(--c-muted)" strokeWidth="2.5" />
      <circle cx="64" cy="100" r="5" fill="var(--c-warn)" />
      <circle cx="64" cy="70" r="5" fill="var(--c-warn)" />
      <circle cx="16" cy="10" r="6" fill="var(--c-accent)" />
      <text x="76" y="104" fill="var(--c-muted)" fontSize="10" fontFamily="var(--font-mono)">2023</text>
      <text x="76" y="74" fill="var(--c-muted)" fontSize="10" fontFamily="var(--font-mono)">2024</text>
      <text x="26" y="164" fill="var(--c-muted)" fontSize="10" fontFamily="var(--font-mono)">v2</text>
      <text x="26" y="14" fill="var(--c-accent)" fontSize="10" fontFamily="var(--font-mono)">v3</text>
    </svg>
  )
}

function Branch({ b }) {
  return (
    <article className="reveal relative grid gap-4 border-b border-dashed border-warn/40 bg-[repeating-linear-gradient(-45deg,transparent_0_14px,color-mix(in_srgb,var(--c-warn)_5%,transparent)_14px_15px)] py-9 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
      <div className="flex flex-row flex-wrap items-center gap-3 font-mono text-sm md:flex-col md:items-start">
        <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-warn px-2.5 py-1.5 font-semibold text-warn">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="6" cy="5" r="2" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="18" cy="8" r="2" />
            <path d="M6 7v10M18 10c0 5-12 3-12 7" />
          </svg>
          {b.branch}
        </span>
        <time className="text-[13px] text-muted">{b.dates}</time>
        <div className="hidden md:block">
          <BranchGraph />
        </div>
      </div>

      <div className="min-w-0">
        <code className="mb-5 block w-max max-w-full overflow-x-auto rounded-lg border border-line bg-surface px-3 py-2 font-mono text-[13px] text-muted">
          <span className="text-warn">$</span> {b.checkout}
        </code>
        <h3 className="font-display text-[clamp(23px,2.4vw,30px)] leading-tight font-semibold tracking-[-0.02em]">{b.title}</h3>
        <p className="mt-1 text-[15px] text-muted">
          {b.company} · {b.scope}
        </p>
        <div className="mt-5 mb-2 font-mono text-xs font-semibold tracking-[0.08em] text-muted">### Learning</div>
        <ul className="grid max-w-[64ch] gap-2">
          {b.items.map((item) => (
            <li key={item} className="relative pl-6 leading-relaxed">
              <span className="absolute left-0 font-mono text-warn">∗</span>
              {item}
            </li>
          ))}
        </ul>
        <code className="mt-6 block w-max max-w-full overflow-x-auto rounded-lg border border-line bg-surface px-3 py-2 font-mono text-[13px] text-muted">
          <span className="text-ok">$</span> {b.merge} <span className="text-ok">✓</span>
        </code>
      </div>
    </article>
  )
}

export default function Experience() {
  return (
    <Section id="experience" label="CHANGELOG.md" title="Experience," thin="versioned.">
      <div className="border-t border-line">
        {releases.map((r) => (r.branch ? <Branch key={r.branch} b={r} /> : <Release key={r.version} r={r} />))}
      </div>
    </Section>
  )
}
