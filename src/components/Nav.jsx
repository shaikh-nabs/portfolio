import { nav } from '../data'
import { useActiveSection, useTheme } from '../hooks'
import { Icon } from './Icons'

const ids = nav.map((n) => n.id)

export default function Nav() {
  const active = useActiveSection(ids)
  const [theme, toggle] = useTheme()

  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 mx-auto max-w-[1180px] px-4 py-3.5 sm:px-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg/75 py-2 pr-2 pl-4 backdrop-blur-xl">
          <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
            <span className="live-dot size-2.5 rounded-full bg-ok" aria-hidden="true" />
            nabeel<span className="text-muted">.dev</span>
          </a>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex gap-0.5">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    aria-current={active === n.id ? 'true' : undefined}
                    className={`block rounded-[10px] px-3.5 py-2 text-sm transition-colors ${
                      active === n.id
                        ? 'bg-surface text-ink shadow-[inset_0_0_0_1px_var(--c-line)]'
                        : 'text-muted hover:bg-surface hover:text-ink'
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="grid size-10 place-items-center rounded-[10px] border border-line text-muted transition-colors hover:border-accent hover:text-ink"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="size-[18px]" />
            </button>
            <a
              href="#contact"
              className="hidden rounded-[10px] bg-accent px-4 py-3 text-sm leading-none font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 sm:block"
            >
              Hire me
            </a>
          </div>
        </div>
      </header>

      {/* Phones get a native-style bottom tab bar, right in the thumb zone. */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-40 flex justify-around rounded-[20px] border border-line bg-surface/85 p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)] backdrop-blur-xl md:hidden"
      >
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={active === n.id ? 'true' : undefined}
            className={`relative flex flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] leading-none transition-colors ${
              active === n.id ? 'text-accent' : 'text-muted'
            }`}
          >
            <Icon name={n.id} />
            {n.short}
            {active === n.id && <span className="absolute -top-2 h-0.5 w-6 rounded-full bg-accent" />}
          </a>
        ))}
      </nav>
    </>
  )
}
