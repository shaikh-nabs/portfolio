import { useEffect, useRef } from 'react'

const reels = [
  { g: 'linear-gradient(160deg,#1E5B8C,#0E2A47 60%,#C47A3D)', price: '₹ 1.2 Cr', place: '3 BHK · Gomti Nagar, Lucknow', tags: ['1,850 sqft', 'Ready'] },
  { g: 'linear-gradient(170deg,#2F6B4F,#12291F 55%,#D9B36C)', price: 'AED 2.4M', place: 'Villa · Dubai Hills', tags: ['4 bed', '≈ ₹ 5.4 Cr'] },
  { g: 'linear-gradient(150deg,#6B3F8C,#1D1530 55%,#E07A5F)', price: '₹ 68 L', place: '2 BHK · Hazratganj', tags: ['1,120 sqft', 'New'] },
]

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
      <canvas ref={ref} className="block h-[30px] w-full rounded bg-black/55" />
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
          <div className="relative h-full overflow-hidden rounded-[34px] bg-[#05080F]">
            <div className="absolute top-2.5 left-1/2 z-30 h-6 w-[88px] -translate-x-1/2 rounded-full bg-black" />
            <div className="absolute inset-x-2.5 top-11 z-20 grid gap-1">
              <FrameGraph label="UI · 7.9ms/frame" base={6} />
              <FrameGraph label="Raster · 5.2ms/frame" base={4} />
            </div>
            <div className="reel-feed absolute inset-0">
              {[...reels, reels[0]].map((r, i) => (
                <div key={i} className="relative flex h-full flex-col justify-end px-4 pt-5 pb-7 text-white">
                  <div className="absolute inset-0" style={{ background: r.g }} />
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_45%,rgba(0,0,0,.78))]" />
                  <div className="absolute right-3 bottom-24 z-10 flex flex-col gap-3.5">
                    {['♥', '✉', '↗'].map((s) => (
                      <span key={s} className="grid size-9 place-items-center rounded-full bg-white/18 text-sm backdrop-blur">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="relative z-10">
                    <div className="font-display text-[26px] leading-none font-extrabold tracking-tight">{r.price}</div>
                    <div className="mt-1.5 text-[13px] opacity-85">{r.place}</div>
                    <div className="mt-3 flex gap-1.5">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-md bg-white/16 px-2 py-1.5 font-mono text-[11px] leading-none backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
