import { useMemo } from 'react'

/** Small seeded PRNG so the sky looks the same on every visit. */
function createRandom(seed) {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const TINTS = ['248,245,250', '248,245,250', '214,204,250', '241,214,228']

/** One element, many stars: a box-shadow list positioned in viewport units. */
function starShadows(count, seed, [alphaMin, alphaMax]) {
  const rand = createRandom(seed)
  return Array.from({ length: count }, () => {
    const x = (rand() * 100).toFixed(2)
    // Taller than the viewport so parallax never reveals an empty edge.
    const y = (rand() * 165 - 5).toFixed(2)
    const tint = TINTS[Math.floor(rand() * TINTS.length)]
    const alpha = (alphaMin + rand() * (alphaMax - alphaMin)).toFixed(2)
    return `${x}vw ${y}vh rgba(${tint},${alpha})`
  }).join(', ')
}

function useSkyConfig() {
  return useMemo(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280
    const h = typeof window !== 'undefined' ? window.innerHeight : 800
    const area = w * h
    const rand = createRandom(7)

    const twinklers = Array.from({ length: w < 640 ? 14 : 26 }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: `${(1.4 + rand() * 1.6).toFixed(2)}px`,
      duration: `${(3.5 + rand() * 5).toFixed(2)}s`,
      delay: `${(-rand() * 8).toFixed(2)}s`,
    }))

    const particles = Array.from({ length: w < 640 ? 9 : 16 }, () => ({
      left: `${(rand() * 100).toFixed(2)}%`,
      size: `${(2 + rand() * 3).toFixed(2)}px`,
      duration: `${(26 + rand() * 24).toFixed(2)}s`,
      delay: `${(-rand() * 40).toFixed(2)}s`,
      drift: `${((rand() - 0.5) * 120).toFixed(0)}px`,
      opacity: (0.25 + rand() * 0.45).toFixed(2),
    }))

    return {
      far: starShadows(Math.round(area / 3200), 11, [0.25, 0.6]),
      mid: starShadows(Math.round(area / 9000), 23, [0.45, 0.85]),
      near: starShadows(Math.round(area / 28000), 37, [0.7, 1]),
      twinklers,
      particles,
    }
  }, [])
}

/**
 * Fixed, full-screen night sky that sits behind every section.
 * Scroll position (--sy) and closing progress (--dawn) are written onto
 * this element by App, so all motion stays on the compositor.
 */
export default function Sky({ skyRef }) {
  const sky = useSkyConfig()

  return (
    <div className="sky" ref={skyRef} aria-hidden="true">
      <div className="sky__nebula" />

      <div className="sky__layer sky__layer--far">
        <div className="sky__drift">
          <span className="sky__stars sky__stars--far" style={{ boxShadow: sky.far }} />
        </div>
      </div>
      <div className="sky__layer sky__layer--mid">
        <div className="sky__drift sky__drift--slow">
          <span className="sky__stars sky__stars--mid" style={{ boxShadow: sky.mid }} />
        </div>
      </div>
      <div className="sky__layer sky__layer--near">
        <span className="sky__stars sky__stars--near" style={{ boxShadow: sky.near }} />
        {sky.twinklers.map((t, i) => (
          <span
            key={i}
            className="twinkle"
            style={{
              left: t.left,
              top: t.top,
              width: t.size,
              height: t.size,
              '--d': t.duration,
              '--delay': t.delay,
            }}
          />
        ))}
      </div>

      <div className="sky__particles">
        {sky.particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              '--d': p.duration,
              '--delay': p.delay,
              '--dx': p.drift,
              '--o': p.opacity,
            }}
          />
        ))}
      </div>

      <div className="sky__dawn" />
      <div className="sky__vignette" />
      <div className="sky__grain" />
    </div>
  )
}
