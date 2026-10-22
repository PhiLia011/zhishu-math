import type { CSSProperties } from 'react'

export function ScoreRing({
  value,
  label,
  size = 'large'
}: {
  value: number
  label: string
  size?: 'small' | 'large'
}) {
  const safeValue = Math.max(0, Math.min(100, value))
  const style = {
    '--score': `${safeValue * 3.6}deg`
  } as CSSProperties
  return (
    <div className={`score-ring ${size}`} style={style} aria-label={`${label} ${safeValue}%`}>
      <div>
        <strong>{safeValue}<small>%</small></strong>
        <span>{label}</span>
      </div>
    </div>
  )
}
