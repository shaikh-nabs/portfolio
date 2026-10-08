import { education } from '../data'
import Section from './Section'

const K = ({ children }) => <span className="text-accent">{children}</span>
const V = ({ children }) => <span className="text-ok">{children}</span>
const C = ({ children }) => <span className="text-muted">{children}</span>

export default function Stack() {
  return (
    <Section id="stack" label="Dependencies" title="What I build" thin="with.">
      <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="reveal min-w-0">
          <p className="mb-5 max-w-[42ch] text-lg leading-relaxed text-muted">
            Dart and Flutter day to day, with Java and Kotlin underneath when the platform needs talking to directly. I care
            about the parts users never see: caching, offline state, deep links and frame budgets.
          </p>
          <div className="mt-10">
            <span className="label">Education</span>
            <div className="mt-5 grid gap-5">
              {education.map((e) => (
                <div key={e.title} className="border-l-2 border-line pl-4 transition-colors hover:border-accent">
                  <b className="block font-display text-lg leading-snug font-semibold">{e.title}</b>
                  <span className="block text-[15px] text-muted">{e.where}</span>
                  <span className="font-mono text-[13px] text-muted">{e.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal min-w-0 overflow-hidden rounded-[20px] border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-xs text-muted">
            <i className="size-2.5 rounded-full bg-[#F87171]/80" />
            <i className="size-2.5 rounded-full bg-[#FBBF24]/80" />
            <i className="size-2.5 rounded-full bg-[#4ADE80]/80" />
            <span className="ml-2">pubspec.yaml</span>
          </div>
          <pre className="overflow-x-auto px-6 py-5 font-mono text-[13.5px] leading-[1.8] sm:text-sm">
            <K>name</K>: mohd_nabeel{'\n'}
            <K>description</K>: Flutter developer, Lucknow{'\n'}
            <K>version</K>: 3.0.0<C>+2025</C>
            {'\n\n'}
            <K>environment</K>:{'\n'}
            {'  '}<K>languages</K>: [dart, java, kotlin]
            {'\n\n'}
            <K>dependencies</K>:{'\n'}
            {'  '}<K>flutter</K>: <V>sdk</V>{'\n'}
            {'  '}<K>android_sdk</K>: <V>native</V>{'\n'}
            {'  '}<K>get</K>: <V>^state</V>{'          '}<C># GetX</C>{'\n'}
            {'  '}<K>architecture</K>: <V>[mvvm, clean]</V>{'\n'}
            {'  '}<K>firebase</K>: <V>auth, firestore, fcm</V>{'\n'}
            {'  '}<K>rest_api</K>: <V>any</V>{'\n'}
            {'  '}<K>agora_chat</K>: <V>realtime</V>{'\n'}
            {'  '}<K>branch_io</K>: <V>deep_links</V>{'\n'}
            {'  '}<K>mixpanel</K>: <V>analytics</V>
            {'\n\n'}
            <K>dev_dependencies</K>:{'\n'}
            {'  '}<K>git</K>: <V>github.com/Shaikh-Nabeel</V>
            {'\n\n'}
            <C># offline-first · caching · push · deep linking · cross-platform</C>
          </pre>
        </div>
      </div>
    </Section>
  )
}
