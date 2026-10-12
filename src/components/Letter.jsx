import { letter } from '../content/letter.js'
import Reveal from './Reveal.jsx'
import WithHearts from './WithHearts.jsx'
import { HeartDivider, StarDivider } from './Ornament.jsx'

function Emphasis({ text }) {
  // "Because they do. You do." — let the second beat land a little brighter.
  const [first, ...rest] = text.split('. ')
  return (
    <Reveal as="p" className="letter__emphasis">
      <span className="letter__emphasis-a">{first}.</span>{' '}
      <span className="letter__emphasis-b">{rest.join('. ')}</span>
    </Reveal>
  )
}

function Block({ kind, text }) {
  switch (kind) {
    case 'greeting':
      return (
        <Reveal as="p" className="letter__greeting">
          <WithHearts text={text} />
        </Reveal>
      )
    case 'emphasis':
      return <Emphasis text={text} />
    case 'final':
      return (
        <Reveal className="letter__final">
          <HeartDivider className="letter__final-ornament" />
          <p>
            <WithHearts text={text} />
          </p>
        </Reveal>
      )
    case 'signoff':
      return (
        <Reveal as="p" className="letter__signoff" delay={0.3}>
          {text}
        </Reveal>
      )
    default:
      return (
        <Reveal as="p" className="letter__p">
          {text}
        </Reveal>
      )
  }
}

export default function Letter({ headingRef }) {
  return (
    <section className="letter-section" id="letter" aria-labelledby="letter-heading">
      <Reveal as="article" className="letter" threshold={0}>
        <h2 id="letter-heading" className="visually-hidden" tabIndex={-1} ref={headingRef}>
          A letter for Medhavi
        </h2>
        <StarDivider className="letter__ornament" />
        {letter.map((block, i) => (
          <Block key={i} {...block} />
        ))}
      </Reveal>
    </section>
  )
}
