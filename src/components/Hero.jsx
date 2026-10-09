import { profile, marquee } from '../data'
import { useClock } from '../hooks'
import Phone from './Phone'

export default function Hero() {
  const time = useClock('Asia/Kolkata')

  return (
    <section id="home" className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-4 pt-8 pb-16 sm:px-6 md:pt-14 md:pb-20 lg:grid-cols-[1.25fr_.75fr]">
        <div className="min-w-0">
          <div className="rise mb-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] text-muted" style={{ '--i': 0 }}>
            <span className="text-ok">● {profile.status}</span>
            <span>
              Lucknow, IN · <span className="tabular-nums">{time}</span> IST
            </span>
            <span>Flutter · Android · iOS</span>
          </div>

          <h1 className="mb-7 font-display text-[clamp(46px,7.6vw,104px)] leading-[0.92] font-extrabold tracking-[-0.035em]">
            <span className="rise block" style={{ '--i': 1 }}>
              {profile.name}
            </span>
          </h1>

          <p className="rise mb-8 max-w-[34em] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-muted" style={{ '--i': 2 }}>
            Flutter developer with roots in native Android, shipping production apps since{' '}
            <strong className="font-medium text-ink">2021</strong>. Most recently a{' '}
            <strong className="font-medium text-ink">50% performance gain</strong> on a real-estate app with reels, chat and
            deep links.
          </p>

          <div className="rise flex flex-wrap items-center gap-3" style={{ '--i': 3 }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-ink px-5 py-3.5 text-[15px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              See the apps <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-xl border border-line px-5 py-3.5 font-mono text-sm transition-colors hover:border-accent"
            >
              {profile.email}
            </a>
          </div>

          <div className="rise mt-7 flex flex-wrap gap-5" style={{ '--i': 4 }}>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-line pb-1 font-mono text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <Phone />
      </div>

      <div className="overflow-hidden border-y border-line py-[18px]" aria-hidden="true">
        <div className="marquee flex w-max">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center font-display text-[15px] font-semibold whitespace-nowrap text-muted">
              <span className="mx-12 text-accent">✦</span>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
