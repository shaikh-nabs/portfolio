export default function Section({ id, label, title, thin, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-[1180px] px-4 py-16 sm:px-6 md:py-24 ${className}`}>
      <div className="reveal mb-12 grid items-end gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
        <span className="label">{label}</span>
        <h2 className="font-display text-[clamp(36px,4.8vw,62px)] leading-none font-extrabold tracking-[-0.03em]">
          {title} <span className="font-normal text-muted">{thin}</span>
        </h2>
      </div>
      {children}
    </section>
  )
}
