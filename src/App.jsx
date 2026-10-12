import { useEffect, useRef } from 'react'
import Sky from './components/Sky.jsx'
import Opening from './components/Opening.jsx'
import Letter from './components/Letter.jsx'
import Closing from './components/Closing.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { prefersReducedMotion, useReducedMotion } from './hooks/useReducedMotion.js'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function App() {
  const skyRef = useRef(null)
  const closingRef = useRef(null)
  const letterHeadingRef = useRef(null)
  const reducedMotion = useReducedMotion()

  // Feed scroll position (parallax) and closing progress (sky brightening)
  // to the sky as CSS variables, at most once per frame.
  useEffect(() => {
    const sky = skyRef.current
    const closing = closingRef.current
    if (!sky || !closing) return

    let frame = 0
    const update = () => {
      frame = 0
      const viewport = window.innerHeight
      const top = closing.getBoundingClientRect().top
      const dawn = clamp((viewport - top) / (viewport * 0.85), 0, 1)
      sky.style.setProperty('--sy', reducedMotion ? '0' : String(Math.round(window.scrollY)))
      sky.style.setProperty('--dawn', dawn.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion])

  const goToLetter = () => {
    const letter = document.getElementById('letter')
    if (!letter) return
    letter.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    letterHeadingRef.current?.focus({ preventScroll: true })
    history.replaceState(null, '', '#letter')
  }

  return (
    <>
      <Sky skyRef={skyRef} />
      <main className="page">
        <Opening onBegin={goToLetter} />
        <Letter headingRef={letterHeadingRef} />
        <Closing sectionRef={closingRef} />
      </main>
      <MusicToggle />
    </>
  )
}
