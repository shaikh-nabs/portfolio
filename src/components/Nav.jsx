import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { nav, profile, releases, featured, projects, moreApps } from '../data'
import { useActiveSection, useTheme, useScrollProgress, useFps, useClock } from '../hooks'
import { Icon } from './Icons'

const ids = nav.map((n) => n.id)

const captions = {
  home: 'Start here',
  experience: releases[0].version,
  projects: `${featured.length + projects.length + moreApps.length} apps`,
  stack: 'pubspec',
  contact: 'Say hi',
}

// Ring that fills as the page scrolls, drawn around the current section's icon.
function ProgressRing({ value }) {
  const r = 14
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 32 32" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
      <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2.5" />
      <circle
        cx="16"
        cy="16"
        r={r}
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
      />
    </svg>
  )
}

// The navbar is a Dynamic Island: a compact live pill that springs open into a control centre.
export default function Nav() {
  const active = useActiveSection(ids)
  const [theme, toggleTheme] = useTheme()
  const progress = useScrollProgress()
  const fps = useFps()
  const time = useClock('Asia/Kolkata')
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const island = useRef(null)
  const panel = useRef(null)
  const [panelH, setPanelH] = useState(250)
  const closeTimer = useRef(0)
  const current = nav.find((n) => n.id === active) ?? nav[0]

  // Little bounce whenever the section changes, like a Live Activity update.
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setBump(true)
    const t = setTimeout(() => setBump(false), 450)
    return () => clearTimeout(t)
  }, [active])

  // The island grows to exactly the panel's height.
  useLayoutEffect(() => {
    const measure = () => panel.current && setPanelH(panel.current.offsetHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Close on Escape or a tap outside.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => island.current && !island.current.contains(e.target) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const hoverable = () => matchMedia('(hover: hover) and (pointer: fine)').matches
  const enter = () => {
    clearTimeout(closeTimer.current)
    if (hoverable()) setOpen(true)
  }
  const leave = () => {
    if (hoverable()) closeTimer.current = setTimeout(() => setOpen(false), 180)
  }

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 h-[72px]">
      <div className="relative mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a href="#home" className="hidden items-center gap-2.5 font-display text-lg font-extrabold tracking-tight md:flex">
          <span className="live-dot size-2.5 rounded-full bg-ok" aria-hidden="true" />
          nabeel<span className="text-muted">.dev</span>
        </a>
        <a
          href="#contact"
          className="ml-auto hidden rounded-full border border-line bg-bg/70 px-4 py-2.5 text-sm leading-none font-semibold backdrop-blur transition-colors hover:border-accent md:block"
        >
          Contact
        </a>
      </div>

      <div
        ref={island}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={(e) => e.target.matches(':focus-visible') && setOpen(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
        data-open={open}
        style={{ '--panel-h': `${panelH}px` }}
        className={`island absolute top-3 left-1/2 -translate-x-1/2 overflow-hidden bg-black text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,.65),inset_0_0_0_1px_rgba(255,255,255,.08)] ${
          bump && !open ? 'island-bump' : ''
        }`}
      >
        {/* compact: live pill */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="island-panel"
          aria-label={`${current.label} section. Open navigation`}
          className="island-compact absolute inset-0 flex items-center gap-2.5 pr-3.5 pl-1.5"
        >
          <span className="relative grid size-8 shrink-0 place-items-center">
            <ProgressRing value={progress} />
            <Icon name={current.id} className="size-[15px]" />
          </span>
          <span key={current.id} className="island-label flex-1 truncate text-left text-[13px] font-semibold">
            {current.label}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#4ADE80] tabular-nums">
            <span className="live-dot size-1.5 rounded-full bg-[#4ADE80]" />
            {Math.min(fps, 120)}fps
          </span>
        </button>

        {/* expanded: control centre */}
        <nav ref={panel} id="island-panel" aria-label="Sections" className="island-panel absolute inset-x-0 top-0 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[11px] text-white/60">
            <span className="flex min-w-0 items-center gap-2">
              <span className="live-dot size-1.5 shrink-0 rounded-full bg-[#4ADE80]" />
              <span className="truncate">{profile.status}</span>
            </span>
            <span className="shrink-0 tabular-nums">
              Lucknow · {time} IST · <span className="text-[#4ADE80]">{Math.min(fps, 120)}fps</span>
            </span>
          </div>

          <ul className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {nav.map((n, i) => (
              <li key={n.id} className="island-tile" style={{ '--i': i }}>
                <a
                  href={`#${n.id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className="group flex flex-col items-center gap-1.5 rounded-2xl px-1 py-2 text-center transition-colors hover:bg-white/8"
                >
                  <span
                    className={`grid size-11 place-items-center rounded-[14px] transition-transform group-hover:-translate-y-0.5 sm:size-12 ${
                      active === n.id ? 'bg-[var(--c-accent)] text-[var(--c-accent-ink)]' : 'bg-white/10'
                    }`}
                  >
                    <Icon name={n.id} className="size-5" />
                  </span>
                  <span className="text-[11px] leading-tight font-semibold sm:text-xs">{n.short}</span>
                  <span className="hidden font-mono text-[10px] leading-none text-white/45 sm:block">{captions[n.id]}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={toggleTheme}
              tabIndex={open ? 0 : -1}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="size-[18px]" />
            </button>
            <span className="flex-1 font-mono text-[11px] text-white/50">{Math.round(progress * 100)}% scrolled</span>
            <a
              href="#contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="rounded-full bg-[var(--c-accent)] px-4 py-2.5 text-sm leading-none font-semibold text-[var(--c-accent-ink)]"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
