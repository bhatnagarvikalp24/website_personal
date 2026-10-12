/**
 * Small decorative dividers. Purely visual, hidden from assistive tech.
 */
export function StarDivider({ className = '' }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament__line" />
      <svg className="ornament__star" viewBox="0 0 24 24" width="14" height="14">
        <path d="M12 1.5c.5 6 4.5 10 10.5 10.5-6 .5-10 4.5-10.5 10.5C11.5 16.5 7.5 12.5 1.5 12 7.5 11.5 11.5 7.5 12 1.5Z" />
      </svg>
      <span className="ornament__line" />
    </div>
  )
}

export function HeartDivider({ className = '' }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament__line" />
      <svg className="ornament__heart" viewBox="0 0 24 24" width="14" height="14">
        <path d="M12 20.2s-7.6-4.6-9.2-9.4C1.7 7.4 3.9 4.2 7.2 4.2c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.3 0 5.5 3.2 4.4 6.6-1.6 4.8-9.2 9.4-9.2 9.4Z" />
      </svg>
      <span className="ornament__line" />
    </div>
  )
}
