import { useInView } from '../hooks/useInView.js'

/**
 * Fades its content in (opacity + soft blur + slight rise) when scrolled into view.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  threshold,
  children,
  ...rest
}) {
  const [ref, inView] = useInView(threshold === undefined ? undefined : { threshold })

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
