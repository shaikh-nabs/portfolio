import { featured, projects, moreApps } from '../data'
import { Icon } from './Icons'
import Section from './Section'

// Real icon if one is provided in data.js, otherwise a tinted monogram tile.
function AppIcon({ app, size = 'size-14', text = 'text-xl' }) {
  if (app.icon) return <img src={app.icon} alt="" className={`${size} rounded-[22%] object-cover`} />
  const initials = app.name
    .replace(/&/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <span
      aria-hidden="true"
      className={`${size} ${text} grid shrink-0 place-items-center rounded-[22%] font-display font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)]`}
      style={{ background: `linear-gradient(145deg, hsl(${app.hue} 70% 55%), hsl(${app.hue + 25} 65% 30%))` }}
    >
      {initials}
    </span>
  )
}

function PlayLink({ href, name, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on Google Play`}
      className={`inline-flex items-center gap-2 rounded-[10px] border border-line px-3.5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      <Icon name="play" className="size-3.5" />
      Google Play
      <Icon name="arrow" className="size-3.5" />
    </a>
  )
}

const screens = [
  'linear-gradient(170deg,#2F6B4F,#12291F 60%,#D9B36C)',
  'linear-gradient(160deg,#1E5B8C,#0E2A47 60%,#C47A3D)',
  'linear-gradient(150deg,#6B3F8C,#1D1530 60%,#E07A5F)',
]

export default function Projects() {
  return (
    <Section id="projects" label="Shipped apps" title="Things in people's" thin="pockets.">
      <article className="reveal grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-5 p-7 sm:p-11">
          <div className="flex items-center gap-4">
            <AppIcon app={featured} />
            <span className="label">{featured.kicker}</span>
          </div>
          <h3 className="font-display text-[clamp(40px,4.6vw,60px)] leading-none font-extrabold tracking-[-0.035em]">
            {featured.name}
          </h3>
          <p className="max-w-[46ch] text-muted">{featured.description}</p>
          <ul className="grid max-w-[52ch] gap-2">
            {featured.points.map((p) => (
              <li key={p} className="relative pl-6 text-[15px] leading-relaxed">
                <span className="absolute left-0 font-mono text-accent">→</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {featured.stack.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-3">
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-5 py-3.5 text-[15px] font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              <Icon name="play" className="size-4" />
              Get it on Google Play
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="grid-paper relative flex min-h-[340px] items-end justify-center gap-4 overflow-hidden pt-10 lg:min-h-[460px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_60%_30%,color-mix(in_srgb,var(--c-accent)_32%,transparent),transparent_70%)]" />
          {screens.map((g, i) => (
            <div
              key={i}
              className={`relative aspect-[9/19] rounded-[26px] bg-[#141B28] p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.55)] transition-transform duration-500 hover:-translate-y-3 ${
                i === 1 ? 'w-[132px] translate-y-3 sm:w-[176px]' : 'w-[112px] translate-y-10 sm:w-[150px]'
              }`}
            >
              <div className="relative h-full overflow-hidden rounded-[20px]" style={{ background: g }}>
                <div className="absolute inset-x-3 bottom-4 grid gap-1.5">
                  <span className="h-2.5 w-2/3 rounded bg-white/80" />
                  <span className="h-2 w-1/2 rounded bg-white/45" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.name}
            className="reveal flex flex-col gap-4 rounded-[20px] border border-line p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
          >
            <div className="flex items-center gap-4">
              <AppIcon app={p} size="size-12" text="text-lg" />
              <span className="font-mono text-xs text-muted">{p.kicker}</span>
            </div>
            <h4 className="font-display text-[26px] leading-tight font-semibold tracking-[-0.02em]">{p.name}</h4>
            <p className="text-[15px] leading-relaxed text-muted">{p.description}</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
              <PlayLink href={p.href} name={p.name} />
            </div>
          </article>
        ))}
      </div>

      <div className="reveal mt-12">
        <span className="label">Also shipped · tap to open on Google Play</span>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moreApps.map((a) => (
            <a
              key={a.name}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 rounded-2xl border border-line p-3.5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <AppIcon app={a} size="size-11" text="text-base" />
              <span className="min-w-0">
                <span className="block truncate font-display text-[17px] font-semibold">{a.name}</span>
                <span className="font-mono text-xs text-muted">{a.note}</span>
              </span>
              <Icon
                name="arrow"
                className="ml-auto size-4 shrink-0 text-muted transition-colors group-hover:text-accent"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
