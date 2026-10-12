import { useEffect, useRef, useState } from 'react'

// Drop a track you have the rights to at public/audio/ambient.mp3 and the
// toggle appears automatically. Without the file, nothing is rendered.
const TRACK = `${import.meta.env.BASE_URL}audio/ambient.mp3`
const TARGET_VOLUME = 0.45

export default function MusicToggle() {
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const fadeRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    fetch(TRACK, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || ''
        if (!cancelled && res.ok && type.startsWith('audio')) setAvailable(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), [])

  const fadeTo = (audio, target, onDone) => {
    cancelAnimationFrame(fadeRef.current)
    const start = audio.volume
    const startedAt = performance.now()
    const duration = 1800
    const step = (now) => {
      const t = Math.min((now - startedAt) / duration, 1)
      audio.volume = start + (target - start) * t
      if (t < 1) fadeRef.current = requestAnimationFrame(step)
      else onDone?.()
    }
    fadeRef.current = requestAnimationFrame(step)
  }

  const toggle = async () => {
    if (!audioRef.current) {
      const audio = new Audio(TRACK)
      audio.loop = true
      audio.volume = 0
      audioRef.current = audio
    }
    const audio = audioRef.current

    if (playing) {
      setPlaying(false)
      fadeTo(audio, 0, () => audio.pause())
      return
    }
    try {
      await audio.play()
      setPlaying(true)
      fadeTo(audio, TARGET_VOLUME)
    } catch {
      setPlaying(false)
    }
  }

  if (!available) return null

  return (
    <button
      type="button"
      className={`music-toggle ${playing ? 'is-playing' : ''}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <rect x="3.5" y="3" width="3" height="10" rx="1" />
          <rect x="9.5" y="3" width="3" height="10" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" />
        </svg>
      )}
    </button>
  )
}
