import { useEffect, useState } from 'react'

// Which section is under the top ~40% of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) cur = ids[ids.length - 1]
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

// Slides `.reveal` elements in once, only if they start below the fold.
export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')]
    const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    below.forEach((el) => el.classList.add('pending'))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('pending')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    below.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#EEF2F7' : '#0A0F1A')
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

export function useClock(timeZone) {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' })
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 10000)
    return () => clearInterval(t)
  }, [])
  return time
}

// Fraction of the page scrolled, 0 → 1.
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => raf || (raf = requestAnimationFrame(read))
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return p
}

// Real frames per second, sampled from requestAnimationFrame every half second.
export function useFps() {
  const [fps, setFps] = useState(60)
  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let raf
    const tick = (now) => {
      frames++
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)))
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return fps
}
