import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'
import { useReveal } from './hooks'

export default function App() {
  useReveal()
  return (
    <>
      <a
        href="#experience"
        className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
