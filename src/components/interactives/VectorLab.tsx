import { useState, type PointerEvent } from 'react'

interface Vec {
  x: number
  y: number
}

const CENTER = 170
const SCALE = 34

export function VectorLab() {
  const [a, setA] = useState<Vec>({ x: 2, y: 1 })
  const [b, setB] = useState<Vec>({ x: 1, y: 2 })
  const [activeHandle, setActiveHandle] = useState<'a' | 'b' | null>(null)
  const sum = { x: a.x + b.x, y: a.y + b.y }
  const dot = a.x * b.x + a.y * b.y
  const magnitudeA = Math.hypot(a.x, a.y)
  const magnitudeB = Math.hypot(b.x, b.y)
  const angle =
    magnitudeA > 0 && magnitudeB > 0
      ? (Math.acos(Math.max(-1, Math.min(1, dot / (magnitudeA * magnitudeB)))) * 180) / Math.PI
      : null

  function vectorPoint(vector: Vec) {
    return { x: CENTER + vector.x * SCALE, y: CENTER - vector.y * SCALE }
  }

  function updateFromPointer(
    which: 'a' | 'b',
    event: PointerEvent<SVGSVGElement>
  ) {
    const svg = event.currentTarget
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 340
    const y = ((event.clientY - rect.top) / rect.height) * 340
    const next = {
      x: Math.max(-4, Math.min(4, Math.round((x - CENTER) / SCALE))),
      y: Math.max(-4, Math.min(4, Math.round((CENTER - y) / SCALE)))
    }
    if (which === 'a') setA(next)
    else setB(next)
  }

  const aPoint = vectorPoint(a)
  const bPoint = vectorPoint(b)
  const sumPoint = vectorPoint(sum)

  return (
    <section className="interactive-card" aria-labelledby="vector-lab-title">
      <header className="interactive-heading">
        <div>
          <span className="eyebrow">向量工作台</span>
          <h3 id="vector-lab-title">拖动两个向量，观察合成结果</h3>
        </div>
        <span className="drag-hint">拖动圆点或用下方滑块</span>
      </header>

      <div className="vector-layout">
        <svg
          viewBox="0 0 340 340"
          className="vector-svg"
          role="img"
          aria-label="可拖动的平面向量图"
          onPointerMove={(event) => {
            if (activeHandle) updateFromPointer(activeHandle, event)
          }}
          onPointerUp={() => setActiveHandle(null)}
          onPointerLeave={() => setActiveHandle(null)}
        >
          <defs>
            <marker id="arrow-a" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="arrow-a" />
            </marker>
            <marker id="arrow-b" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="arrow-b" />
            </marker>
            <marker id="arrow-sum" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" className="arrow-sum" />
            </marker>
          </defs>
          {Array.from({ length: 9 }, (_, index) => (
            <g key={index}>
              <line x1={index * 42.5} x2={index * 42.5} y1="0" y2="340" className="grid-line" />
              <line x1="0" x2="340" y1={index * 42.5} y2={index * 42.5} className="grid-line" />
            </g>
          ))}
          <line x1="0" x2="340" y1="170" y2="170" className="axis-line" />
          <line x1="170" x2="170" y1="0" y2="340" className="axis-line" />
          <line x1="170" y1="170" x2={aPoint.x} y2={aPoint.y} className="vector-a" markerEnd="url(#arrow-a)" />
          <line x1="170" y1="170" x2={bPoint.x} y2={bPoint.y} className="vector-b" markerEnd="url(#arrow-b)" />
          <line x1="170" y1="170" x2={sumPoint.x} y2={sumPoint.y} className="vector-sum" markerEnd="url(#arrow-sum)" />
          <line x1={aPoint.x} y1={aPoint.y} x2={sumPoint.x} y2={sumPoint.y} className="vector-dash" />
          <line x1={bPoint.x} y1={bPoint.y} x2={sumPoint.x} y2={sumPoint.y} className="vector-dash" />
          <circle
            cx={aPoint.x}
            cy={aPoint.y}
            r="9"
            className="vector-handle handle-a"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId)
              setActiveHandle('a')
            }}
            tabIndex={0}
            aria-label={`向量 a 的终点，当前坐标 ${a.x}, ${a.y}`}
          />
          <circle
            cx={bPoint.x}
            cy={bPoint.y}
            r="9"
            className="vector-handle handle-b"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId)
              setActiveHandle('b')
            }}
            tabIndex={0}
            aria-label={`向量 b 的终点，当前坐标 ${b.x}, ${b.y}`}
          />
          <text x="246" y="165" className="axis-text">x</text>
          <text x="177" y="18" className="axis-text">y</text>
        </svg>

        <div className="vector-controls">
          <VectorSlider label="aₓ" value={a.x} onChange={(value) => setA({ ...a, x: value })} />
          <VectorSlider label="aᵧ" value={a.y} onChange={(value) => setA({ ...a, y: value })} />
          <VectorSlider label="bₓ" value={b.x} onChange={(value) => setB({ ...b, x: value })} />
          <VectorSlider label="bᵧ" value={b.y} onChange={(value) => setB({ ...b, y: value })} />
          <div className="metric-strip vector-metrics">
            <div><span>a + b</span><strong>({sum.x}, {sum.y})</strong></div>
            <div><span>点积</span><strong>{dot}</strong></div>
            <div><span>夹角</span><strong>{angle === null ? '—' : `${angle.toFixed(1)}°`}</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VectorSlider({
  label,
  value,
  onChange
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label className="range-control">
      <span>{label}<strong>{value}</strong></span>
      <input
        type="range"
        min="-4"
        max="4"
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </label>
  )
}
