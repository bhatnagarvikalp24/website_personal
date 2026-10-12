import { StarDivider } from './Ornament.jsx'

export default function Opening({ onBegin }) {
  const handleClick = (event) => {
    event.preventDefault()
    onBegin()
  }

  return (
    <header className="opening" id="top">
      <div className="opening__inner">
        <StarDivider className="opening__ornament intro-step" />

        <h1 className="opening__title">
          <span className="opening__for intro-step">For</span>{' '}
          <span className="opening__name intro-step">Medhavi Dua</span>
        </h1>

        <p className="opening__line intro-step">Some things are too important to leave unsaid.</p>

        <a className="cta intro-step" href="#letter" onClick={handleClick}>
          <span>Read this when you're ready</span>
          <svg className="cta__arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M8 2.5v10.5M3.5 8.5 8 13l4.5-4.5" />
          </svg>
        </a>
      </div>

      <div className="opening__cue intro-step" aria-hidden="true">
        <span />
      </div>
    </header>
  )
}
