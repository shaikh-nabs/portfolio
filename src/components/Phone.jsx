import { useEffect, useRef } from 'react'
import { VillaScene, SkylineScene, InteriorScene } from './Scenes'

const reels = [
  {
    Scene: VillaScene,
    price: 'AED 3.2M',
    place: 'Villa · Palm Jumeirah',
    tags: ['4 BHK', '≈ ₹ 7.2 Cr'],
    agent: 'Aisha K.',
    caption: 'Sunset tour of a beachfront villa',
    likes: '12.4k',
  },
  {
    Scene: SkylineScene,
    price: 'AED 2.1M',
    place: 'Penthouse · Downtown',
    tags: ['3 BHK', 'Skyline view'],
    agent: 'Omar R.',
    caption: 'Night view from the 48th floor',
    likes: '8.9k',
    heart: true,
  },
  {
    Scene: InteriorScene,
    price: '₹ 1.4 Cr',
    place: '3 BHK · Gomti Nagar, Lucknow',
    tags: ['1,850 sqft', 'Ready'],
    agent: 'Riya S.',
    caption: 'Golden-hour living room walkthrough',
    likes: '5.2k',
  },
]

const ico = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const Heart = (p) => (
  <svg viewBox="0 0 24 24" {...ico} {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
)

function Reel({ r }) {
  const { Scene } = r
  return (
    <div className="relative h-full overflow-hidden text-white">
      <Scene />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.45),transparent_22%,transparent_48%,rgba(0,0,0,.82)_82%)]" />

      {r.heart && <Heart className="heart-pop absolute top-[38%] left-1/2 size-20 -translate-1/2 fill-[#FF4D6D] stroke-none drop-shadow-lg" />}

      {/* action rail */}
      <div className="absolute right-2.5 bottom-[178px] z-10 flex flex-col items-center gap-3 text-[9px] font-semibold">
        <span className="grid justify-items-center gap-0.5">
          <Heart className={`size-6 ${r.heart ? 'fill-[#FF4D6D] stroke-[#FF4D6D]' : ''}`} />
          {r.likes}
        </span>
        <span className="grid justify-items-center gap-0.5">
          <svg viewBox="0 0 24 24" {...ico} className="size-6"><path d="M4 5h16v11H9l-5 4z" /></svg>
          214
        </span>
        <span className="grid justify-items-center gap-0.5">
          <svg viewBox="0 0 24 24" {...ico} className="size-6"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" /></svg>
          Share
        </span>
      </div>

      {/* listing details */}
      <div className="absolute inset-x-3 bottom-[60px] z-10">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold">
          <span className="grid size-6 place-items-center rounded-full bg-[#C99A5B] text-[9px] font-bold">{r.agent[0]}</span>
          {r.agent}
          <svg viewBox="0 0 24 24" className="size-3 fill-[#54C5F8]"><path d="M12 2l2.4 2.2 3.2-.4.9 3.1 2.9 1.5-1 3 1 3-2.9 1.5-.9 3.1-3.2-.4L12 22l-2.4-2.2-3.2.4-.9-3.1L2.6 15.6l1-3-1-3 2.9-1.5.9-3.1 3.2.4z" /></svg>
          <span className="ml-1 rounded border border-white/60 px-1.5 py-0.5 text-[9px] leading-none">Follow</span>
        </div>
        <p className="mb-2 truncate text-[10.5px] opacity-85">{r.caption}</p>
        <div className="font-display text-[22px] leading-none font-extrabold tracking-tight">{r.price}</div>
        <div className="mt-1 text-[11px] opacity-85">{r.place}</div>
        <div className="mt-2 flex gap-1">
          {r.tags.map((t) => (
            <span key={t} className="rounded bg-white/18 px-1.5 py-1 font-mono text-[9.5px] leading-none backdrop-blur">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[10px] font-semibold">
          <span className="rounded-md bg-[#C99A5B] py-1.5 text-center">Share interest</span>
          <span className="rounded-md bg-[#2FB866] py-1.5 text-center">WhatsApp</span>
        </div>
      </div>
    </div>
  )
}

// Mimics Flutter's PerformanceOverlay: one bar per frame, red when over the 16ms budget.
function FrameGraph({ label, base }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const data = Array.from({ length: 60 }, () => base + Math.random() * 3)
    const draw = () => {
      const w = (c.width = c.clientWidth * 2)
      const h = (c.height = c.clientHeight * 2)
      const budgetY = h * 0.42
      const bw = w / data.length
      ctx.clearRect(0, 0, w, h)
      data.forEach((v, i) => {
        const bh = Math.min(h, (v / 16) * (h - budgetY) + 4)
        ctx.fillStyle = v > 16 ? '#F87171' : '#4ADE80'
        ctx.globalAlpha = 0.85
        ctx.fillRect(i * bw, h - bh, bw - 1, bh)
      })
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgba(255,255,255,.55)'
      ctx.fillRect(0, budgetY, w, 1)
    }
    draw()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      data.shift()
      data.push(base + Math.random() * 3 + (Math.random() < 0.02 ? 11 : 0))
      draw()
    }, 120)
    return () => clearInterval(t)
  }, [base])

  return (
    <div className="relative">
      <canvas ref={ref} className="block h-[22px] w-full rounded bg-black/50" />
      <small className="absolute top-1 left-1.5 font-mono text-[9px] leading-none text-cyan-50/90">{label}</small>
    </div>
  )
}

export default function Phone() {
  const tilt = useRef(null)

  // Subtle 3D tilt toward the pointer on desktop.
  useEffect(() => {
    const el = tilt.current
    if (!el || matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="phone-in relative mx-auto w-[min(290px,78vw)] [perspective:1200px]">
      <div
        aria-hidden="true"
        className="absolute inset-[-18%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--c-accent)_30%,transparent),transparent)] blur-2xl"
      />
      <div ref={tilt} className="transition-transform duration-300 ease-out [transform-style:preserve-3d]">
        <div
          role="img"
          aria-label="Phone playing a reels-style property feed with Flutter's frame-time overlay"
          className="aspect-[9/19] rounded-[44px] bg-[linear-gradient(160deg,#2A3346,#0D121C)] p-2.5 shadow-[0_50px_90px_-30px_rgba(4,30,60,.7),inset_0_0_0_1px_rgba(255,255,255,.08)]"
        >
          <div className="relative h-full overflow-hidden rounded-[34px] bg-[#05080F] text-white">
            <div className="reel-feed absolute inset-0">
              {[...reels, reels[0]].map((r, i) => (
                <Reel key={i} r={r} />
              ))}
            </div>

            {/* status bar */}
            <div className="absolute inset-x-0 top-0 z-30 flex h-9 items-center justify-between px-6 text-[11px] font-semibold">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 18 12" className="h-2.5 fill-white"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2" width="3" height="10" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".4" /></svg>
                <svg viewBox="0 0 26 12" className="h-2.5"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="white" opacity=".6" /><rect x="2" y="2" width="16" height="8" rx="1.5" fill="white" /><rect x="23.5" y="4" width="2" height="4" rx="1" fill="white" opacity=".6" /></svg>
              </span>
            </div>
            <div className="absolute top-2.5 left-1/2 z-40 h-6 w-[84px] -translate-x-1/2 rounded-full bg-black" />

            {/* app header */}
            <div className="absolute inset-x-0 top-9 z-30 flex items-center justify-between px-4">
              <span className="flex gap-3 text-[13px] font-semibold">
                <span>Bites</span>
                <span className="opacity-55">Properties</span>
              </span>
              <svg viewBox="0 0 24 24" {...ico} className="size-[18px]"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" /></svg>
            </div>
            <div className="absolute inset-x-4 top-[62px] z-30 h-0.5 overflow-hidden rounded-full bg-white/25">
              <div className="reel-progress h-full rounded-full bg-white" />
            </div>

            {/* Flutter performance overlay */}
            <div className="absolute inset-x-3 top-[72px] z-20 grid gap-1 opacity-90">
              <FrameGraph label="UI · 7.9ms/frame" base={6} />
              <FrameGraph label="Raster · 5.2ms/frame" base={4} />
            </div>

            {/* tab bar */}
            <div className="absolute inset-x-0 bottom-0 z-30 flex justify-around border-t border-white/10 bg-black/70 px-2 pt-2 pb-4 text-[8.5px] backdrop-blur-md">
              {[
                ['Bites', 'M5 4h14v16H5zM10 9l5 3-5 3z', true],
                ['Properties', 'M3 21V9l9-6 9 6v12zM9 21v-6h6v6'],
                ['Search', 'M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM20 20l-4-4'],
                ['Profile', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'],
              ].map(([label, d, on]) => (
                <span key={label} className={`grid justify-items-center gap-0.5 ${on ? 'text-[#C99A5B]' : 'opacity-60'}`}>
                  <svg viewBox="0 0 24 24" {...ico} className="size-[17px]"><path d={d} /></svg>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="float absolute top-[28%] -left-4 rounded-xl border border-line bg-surface px-3 py-2.5 font-mono text-xs shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] sm:-left-16">
        <b className="mb-1 block font-display text-xl leading-none font-extrabold text-accent">−50%</b>render time
      </div>
      <div className="float-late absolute -right-3 bottom-[16%] rounded-xl border border-line bg-surface px-3 py-2.5 font-mono text-xs shadow-[0_12px_30px_-12px_rgba(0,0,0,.45)] sm:-right-14">
        <b className="mb-1 block font-display text-xl leading-none font-extrabold text-accent">Offline</b>first sync
      </div>
    </div>
  )
}
