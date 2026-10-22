import { useMemo, useState } from 'react'

export function UnitCircleLab() {
  const [degrees, setDegrees] = useState(30)
  const radians = (degrees * Math.PI) / 180
  const cosine = Math.cos(radians)
  const sine = Math.sin(radians)
  const pointX = 140 + cosine * 95
  const pointY = 150 - sine * 95

  const wave = useMemo(() => {
    return Array.from({ length: 181 }, (_, index) => {
      const angle = (index / 180) * Math.PI * 2
      const x = 330 + (angle / (Math.PI * 2)) * 230
      const y = 150 - Math.sin(angle) * 85
      return `${index === 0 ? 'M' : 'L'}${x},${y}`
    }).join(' ')
  }, [])

  return (
    <section className="interactive-card" aria-labelledby="unit-circle-title">
      <header className="interactive-heading">
        <div>
          <span className="eyebrow">角与坐标</span>
          <h3 id="unit-circle-title">旋转角，读出余弦与正弦</h3>
        </div>
        <strong className="angle-readout">{degrees}°</strong>
      </header>

      <svg viewBox="0 0 600 300" className="unit-circle-svg" role="img" aria-label={`角度 ${degrees} 度的单位圆和正弦曲线`}>
        <line x1="30" y1="150" x2="250" y2="150" className="axis-line" />
        <line x1="140" y1="40" x2="140" y2="260" className="axis-line" />
        <circle cx="140" cy="150" r="95" className="unit-circle" />
        <line x1="140" y1="150" x2={pointX} y2={pointY} className="radius-line" />
        <line x1={pointX} y1={pointY} x2={pointX} y2="150" className="sine-guide" />
        <line x1={pointX} y1={pointY} x2="140" y2={pointY} className="cosine-guide" />
        <circle cx={pointX} cy={pointY} r="7" className="unit-point" />
        <text x="252" y="145" className="axis-text">1</text>
        <text x="113" y="49" className="axis-text">1</text>
        <text x="255" y="100" className="plot-label">y = sin x</text>
        <line x1="330" y1="150" x2="560" y2="150" className="axis-line faint-axis" />
        <line x1="330" y1="55" x2="330" y2="245" className="axis-line faint-axis" />
        <path d={wave} className="trig-path" />
        <circle
          cx={330 + (radians / (Math.PI * 2)) * 230}
          cy={150 - sine * 85}
          r="6"
          className="wave-point"
        />
      </svg>

      <input
        className="angle-slider"
        type="range"
        min="0"
        max="360"
        step="1"
        value={degrees}
        onChange={(event) => setDegrees(Number(event.target.value))}
        aria-label="角度"
      />
      <div className="metric-strip">
        <div><span>cos α</span><strong>{cosine.toFixed(3)}</strong></div>
        <div><span>sin α</span><strong>{sine.toFixed(3)}</strong></div>
        <div><span>弧度</span><strong>{radians.toFixed(2)}</strong></div>
      </div>
    </section>
  )
}
