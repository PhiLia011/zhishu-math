import { useMemo, useState } from 'react'

type Family = 'quadratic' | 'sine' | 'exponential'

const familyLabels: Record<Family, string> = {
  quadratic: '二次函数',
  sine: '正弦函数',
  exponential: '指数函数'
}

export function FunctionLab() {
  const [family, setFamily] = useState<Family>('quadratic')
  const [amplitude, setAmplitude] = useState(1)
  const [shift, setShift] = useState(0)
  const [vertical, setVertical] = useState(0)

  const expression =
    family === 'quadratic'
      ? `y = ${format(amplitude)}(x − ${format(shift)})² + ${format(vertical)}`
      : family === 'sine'
        ? `y = ${format(amplitude)} sin(x − ${format(shift)}) + ${format(vertical)}`
        : `y = ${format(amplitude)} · 2ˣ⁻${format(shift)} + ${format(vertical)}`

  const path = useMemo(() => {
    const points: string[] = []
    for (let px = 0; px <= 600; px += 3) {
      const x = -6 + (px / 600) * 12
      let y = 0
      if (family === 'quadratic') y = amplitude * (x - shift) ** 2 + vertical
      if (family === 'sine') y = amplitude * Math.sin(x - shift) + vertical
      if (family === 'exponential') y = amplitude * 2 ** (x - shift) + vertical
      const py = 160 - y * 22
      if (Number.isFinite(py) && Math.abs(py) < 3000) {
        points.push(`${points.length === 0 ? 'M' : 'L'}${px},${py}`)
      }
    }
    return points.join(' ')
  }, [family, amplitude, shift, vertical])

  return (
    <section className="interactive-card" aria-labelledby="function-lab-title">
      <header className="interactive-heading">
        <div>
          <span className="eyebrow">图像实验室</span>
          <h3 id="function-lab-title">改变参数，观察函数图象的移动与伸缩</h3>
        </div>
        <div className="segmented compact" aria-label="选择函数类型">
          {(Object.keys(familyLabels) as Family[]).map((key) => (
            <button
              key={key}
              className={family === key ? 'is-active' : ''}
              onClick={() => setFamily(key)}
            >
              {familyLabels[key]}
            </button>
          ))}
        </div>
      </header>

      <div className="lab-layout">
        <div className="graph-wrap">
          <svg viewBox="0 0 600 320" className="graph-svg" role="img" aria-label={`函数 ${expression} 的图象`}>
            <defs>
              <clipPath id="plot-clip">
                <rect x="0" y="0" width="600" height="320" />
              </clipPath>
            </defs>
            {Array.from({ length: 13 }, (_, index) => (
              <line
                key={`v-${index}`}
                x1={index * 50}
                x2={index * 50}
                y1="0"
                y2="320"
                className={index === 6 ? 'axis-line' : 'grid-line'}
              />
            ))}
            {Array.from({ length: 11 }, (_, index) => (
              <line
                key={`h-${index}`}
                x1="0"
                x2="600"
                y1={index * 32}
                y2={index * 32}
                className={index === 5 ? 'axis-line' : 'grid-line'}
              />
            ))}
            <path d={path} className="function-path" clipPath="url(#plot-clip)" />
            <text x="572" y="151" className="axis-text">x</text>
            <text x="309" y="18" className="axis-text">y</text>
          </svg>
          <div className="expression-pill">{expression}</div>
        </div>
        <div className="parameter-controls">
          <RangeControl label="纵向伸缩 A" value={amplitude} onChange={setAmplitude} min={-3} max={3} step={0.1} />
          <RangeControl label="水平位置 h" value={shift} onChange={setShift} min={-4} max={4} step={0.1} />
          <RangeControl label="纵向平移 k" value={vertical} onChange={setVertical} min={-4} max={4} step={0.1} />
          <p className="lab-note">拖动滑块。负的伸缩系数会让图象关于横轴翻转。</p>
        </div>
      </div>
    </section>
  )
}

function RangeControl({
  label,
  value,
  onChange,
  min,
  max,
  step
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}) {
  return (
    <label className="range-control">
      <span>
        {label}
        <strong>{format(value)}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </label>
  )
}

function format(value: number): string {
  return Number(value.toFixed(1)).toString()
}
