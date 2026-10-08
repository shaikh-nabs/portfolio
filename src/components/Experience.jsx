import { releases } from '../data'
import Section from './Section'

const marks = {
  Added: { sign: '+', cls: 'text-ok' },
  Improved: { sign: '↑', cls: 'text-accent' },
  Fixed: { sign: '~', cls: 'text-warn' },
}

export default function Experience() {
  return (
    <Section id="experience" label="CHANGELOG.md" title="Experience," thin="versioned.">
      <div className="border-t border-line">
        {releases.map((r) => (
          <article
            key={r.version}
            className="reveal group grid gap-4 border-b border-line py-9 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8"
          >
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
        ))}
      </div>
    </Section>
  )
}
