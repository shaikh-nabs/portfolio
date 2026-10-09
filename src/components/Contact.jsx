import { useRef, useState } from 'react'
import { profile } from '../data'
import { Icon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const mail = useRef(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.getSelection()?.selectAllChildren(mail.current)
    }
  }

  return (
    <>
      <section id="contact" className="mx-auto max-w-[1180px] border-t border-line px-4 pt-24 pb-16 sm:px-6 md:pt-32">
        <span className="label reveal block">Open to Flutter roles &amp; freelance</span>
        <h2 className="reveal mt-6 font-display text-[clamp(50px,9.4vw,132px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
          Got an app
          <br />
          <span className="font-normal text-muted">that feels slow?</span>
        </h2>

        <div className="reveal mt-11 flex flex-wrap items-center gap-4">
          <a
            ref={mail}
            href={`mailto:${profile.email}`}
            className="border-b-2 border-accent pb-2 font-mono text-[clamp(18px,2.8vw,32px)] leading-none font-medium break-all transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-line px-3 py-2 font-mono text-[13px] leading-none text-muted transition-colors hover:border-accent hover:text-ink"
          >
            {copied ? 'copied ✓' : 'copy'}
          </button>
        </div>

        <div className="reveal mt-11 grid gap-3 sm:grid-cols-3">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line px-5 py-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <span>
                <b className="block font-display text-lg leading-none font-semibold">{s.label}</b>
                <span className="mt-2 block font-mono text-[13px] text-muted">{s.handle}</span>
              </span>
              <Icon name="arrow" className="size-5 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </a>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-3 border-t border-line px-4 pt-7 pb-32 font-mono text-xs text-muted sm:px-6 md:pb-10">
        <span>© {new Date().getFullYear()} {profile.name} · Lucknow</span>
      </footer>
    </>
  )
}
