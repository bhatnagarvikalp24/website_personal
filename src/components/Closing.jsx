import { useInView } from '../hooks/useInView.js'
import WithHearts from './WithHearts.jsx'

// A handful of stars that bloom brighter as the closing scene arrives.
const BRIGHT_STARS = [
  { left: '14%', top: '18%', size: 1, delay: 0.4 },
  { left: '82%', top: '12%', size: 1.25, delay: 1.2 },
  { left: '68%', top: '34%', size: 0.7, delay: 2.0 },
  { left: '24%', top: '42%', size: 0.6, delay: 2.6 },
  { left: '90%', top: '58%', size: 0.85, delay: 1.7 },
  { left: '8%', top: '70%', size: 0.75, delay: 3.1 },
]

export default function Closing({ sectionRef }) {
  const [ref, inView] = useInView({ threshold: 0.35 })

  const setRefs = (node) => {
    ref.current = node
    if (sectionRef) sectionRef.current = node
  }

  return (
    <footer className={`closing ${inView ? 'is-visible' : ''}`} ref={setRefs}>
      <div className="closing__stars" aria-hidden="true">
        {BRIGHT_STARS.map((star, i) => (
          <span
            key={i}
            className="bright-star"
            style={{
              left: star.left,
              top: star.top,
              '--scale': star.size,
              '--delay': `${star.delay}s`,
            }}
          />
        ))}
        <span className="shooting-star" />
      </div>

      <div className="closing__inner">
        <p className="closing__line closing__step">
          Somewhere in this big universe, I'm really glad our paths crossed.
        </p>
        <p className="closing__name closing__step">
          <WithHearts text="Take your time, Medhu. ❤️" />
        </p>
      </div>

      <div className="closing__credit closing__step">
        <p>Made with love, just for you.</p>
        <p className="closing__byline">
          Tech by Claude · Words by V, <span className="nowrap">missing us from office</span>
        </p>
      </div>
    </footer>
  )
}
