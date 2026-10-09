import { featured, projects, moreApps } from '../data'
import { Icon } from './Icons'
import Section from './Section'

// Real icon if one is provided in data.js, otherwise a tinted monogram tile.
function AppIcon({ app, size = 'size-14', text = 'text-xl' }) {
  if (app.icon) {
    // Paths like '/apps/x.png' resolve against the deploy base (e.g. /portfolio/ on GitHub Pages).
    const src = app.icon.startsWith('/') ? import.meta.env.BASE_URL + app.icon.slice(1) : app.icon
    return <img src={src} alt="" className={`${size} rounded-[22%] object-cover`} />
  }
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

function ReelsArt() {
  return (
    <div className="grid-paper relative flex h-full min-h-[340px] items-end justify-center gap-4 overflow-hidden pt-10 lg:min-h-[460px]">
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
  )
}

const tape = ['300', 'NW', '330', 'N', '30', 'NE', '60', 'E', '90', 'SE', '120']

// E-Netra's evidence camera: the target slides into the reticle as the ranger turns, then the shutter unlocks.
function CompassArt() {
  return (
    <div className="grid-paper relative flex h-full min-h-[400px] items-center justify-center overflow-hidden py-10 lg:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_45%_45%,color-mix(in_srgb,var(--c-ok)_26%,transparent),transparent_70%)]" />

      <div className="relative aspect-[9/19] w-[210px] rounded-[34px] bg-[#141B28] p-2 shadow-[0_40px_70px_-25px_rgba(0,0,0,.6)] sm:w-[232px]">
        <div className="relative h-full overflow-hidden rounded-[27px] bg-[radial-gradient(120%_70%_at_50%_100%,#1F4A2C,#0C2215_55%,#071209)] text-white">
          {/* treeline */}
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-x-0 top-[42%] h-[22%] w-full">
            <path
              d="M0 60V38l8-14 8 14 6-22 8 22 7-12 7 12 9-28 9 28 6-16 6 16 8-20 8 20 7-10 7 10 9-30 9 30 6-14 6 14 8-24 8 24 7-12 7 12 9-18 9 18H200V60z"
              fill="#0E2717"
            />
          </svg>

          {/* compass tape */}
          <div className="absolute inset-x-0 top-9 z-10 overflow-hidden border-y border-white/10 bg-black/35 py-1.5 backdrop-blur-sm">
            <div className="enetra-tape flex w-max gap-4 pl-6 font-mono text-[10px] leading-none text-white/70">
              {tape.map((t) => (
                <span key={t} className={t.length <= 2 && isNaN(t) ? 'font-semibold text-white' : ''}>
                  {t}
                </span>
              ))}
            </div>
            <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-[#FBBF24]" />
          </div>

          {/* tilt level */}
          <div className="absolute top-[30%] right-3 z-10 h-20 w-2 rounded-full bg-black/40">
            <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-[#4ADE80]" />
          </div>

          {/* reticle + target */}
          <div className="absolute top-[44%] left-1/2 z-10 size-24 -translate-1/2">
            <div className="absolute inset-0 rounded-full border border-white/50" />
            <div className="absolute top-1/2 left-0 h-px w-full bg-white/25" />
            <div className="absolute top-0 left-1/2 h-full w-px bg-white/25" />
            <div className="enetra-target absolute top-1/2 left-1/2 -mt-2.5 -ml-2.5 size-5 rounded-full border-2 border-[#FBBF24] bg-[#FBBF24]/30 shadow-[0_0_0_6px_rgba(251,191,36,.15)]" />
          </div>

          <div className="absolute inset-x-0 top-[62%] z-10 text-center font-mono text-[10px] text-white/70">
            HDG 047° · TGT 052° · ±5°
          </div>

          {/* guidance */}
          <div className="absolute inset-x-0 top-[69%] z-10 flex justify-center">
            <div className="relative h-7 w-36">
              <span className="enetra-turn absolute inset-0 grid place-items-center rounded-full bg-[#FBBF24] text-[11px] font-semibold text-[#2A1A00]">
                Turn right 14° →
              </span>
              <span className="enetra-aligned absolute inset-0 grid place-items-center rounded-full bg-[#4ADE80] text-[11px] font-semibold text-[#052E16]">
                Aligned ✓
              </span>
            </div>
          </div>

          {/* shutter */}
          <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
            <div className="enetra-shutter grid size-14 place-items-center rounded-full border-4 border-white/80">
              <svg viewBox="0 0 24 24" className="enetra-lock size-5" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="float absolute top-[16%] left-[6%] rounded-xl border border-line bg-surface px-3 py-2 font-mono text-[11px] shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] sm:left-[12%]">
        <b className="block font-display text-base leading-tight font-extrabold text-ok">GPS ±4 m</b>inside geo-fence
      </div>
      <div className="float-late absolute right-[5%] bottom-[18%] rounded-xl border border-line bg-surface px-3 py-2 font-mono text-[11px] shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] sm:right-[10%]">
        <b className="block font-display text-base leading-tight font-extrabold text-accent">Offline</b>12 queued · Hive
      </div>
      <div className="float absolute bottom-[8%] left-[8%] rounded-xl border border-line bg-surface px-3 py-2 font-mono text-[11px] shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] sm:left-[14%]">
        EN / हिंदी
      </div>
    </div>
  )
}

const arts = { reels: ReelsArt, compass: CompassArt }

function FeaturedCard({ app, flip }) {
  const Art = arts[app.art]
  return (
    <article className="reveal grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
      <div className={`flex min-w-0 flex-col gap-5 p-7 sm:p-11 ${flip ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-4">
          <AppIcon app={app} />
          <span className="label">{app.kicker}</span>
        </div>
        <h3 className="font-display text-[clamp(40px,4.6vw,60px)] leading-none font-extrabold tracking-[-0.035em]">
          {app.name}
        </h3>
        <p className="max-w-[52ch] text-muted">{app.description}</p>
        <ul className="grid max-w-[60ch] gap-2.5">
          {app.points.map((p) => (
            <li key={p} className="relative pl-6 text-[15px] leading-relaxed">
              <span className="absolute left-0 font-mono text-accent">→</span>
              {p}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {app.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-3">
          <a
            href={app.href}
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
      <div aria-hidden="true" className={flip ? 'lg:order-1' : ''}>
        <Art />
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section id="projects" label="Shipped apps" title="Things in people's" thin="pockets.">
      <div className="grid gap-5">
        {featured.map((f, i) => (
          <FeaturedCard key={f.name} app={f} flip={i % 2 === 1} />
        ))}
      </div>

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
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
