const HEART = '❤️'

/** Renders text, wrapping each ❤️ so it can be sized and softened consistently. */
export default function WithHearts({ text }) {
  const parts = text.split(HEART)
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <span className="heart-emoji">{HEART}</span>}
    </span>
  ))
}
