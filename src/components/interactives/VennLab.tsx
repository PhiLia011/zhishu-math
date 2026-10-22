import { useState } from 'react'
import { MathText } from '../MathText'

type Operation = 'union' | 'intersection' | 'difference'

const setA = ['1', '2', '3', '5']
const setB = ['2', '3', '4', '6']

const copy: Record<Operation, { label: string; symbol: string; values: string[] }> = {
  union: { label: '并集', symbol: 'A ∪ B', values: [...new Set([...setA, ...setB])].sort() },
  intersection: { label: '交集', symbol: 'A ∩ B', values: setA.filter((value) => setB.includes(value)) },
  difference: { label: '差集', symbol: 'A − B', values: setA.filter((value) => !setB.includes(value)) }
}

export function VennLab() {
  const [operation, setOperation] = useState<Operation>('intersection')
  const active = copy[operation]

  return (
    <section className="interactive-card" aria-labelledby="venn-title">
      <header className="interactive-heading">
        <div>
          <span className="eyebrow">动手探索</span>
          <h3 id="venn-title">切换集合运算，观察结果如何变化</h3>
        </div>
        <div className="segmented compact" aria-label="选择集合运算">
          {(Object.keys(copy) as Operation[]).map((key) => (
            <button
              key={key}
              className={operation === key ? 'is-active' : ''}
              onClick={() => setOperation(key)}
            >
              {copy[key].label}
            </button>
          ))}
        </div>
      </header>

      <div className="venn-layout">
        <svg viewBox="0 0 430 250" className="venn-svg" role="img" aria-label="集合 A 和集合 B 的韦恩图">
          <circle cx="165" cy="128" r="86" className="venn-circle left" />
          <circle cx="265" cy="128" r="86" className="venn-circle right" />
          <text x="104" y="55" className="venn-label">A</text>
          <text x="318" y="55" className="venn-label">B</text>
          <text x="77" y="120" className="venn-element">1</text>
          <text x="77" y="160" className="venn-element">5</text>
          <text x="193" y="120" className="venn-element emphasis">2</text>
          <text x="193" y="160" className="venn-element emphasis">3</text>
          <text x="326" y="120" className="venn-element">4</text>
          <text x="326" y="160" className="venn-element">6</text>
          <text x="122" y="122" className="venn-element faint">3</text>
        </svg>
        <div className="set-result">
          <span className="eyebrow">当前结果</span>
          <p className="set-symbol">{active.symbol}</p>
          <div className="set-chips">
            {active.values.map((value) => (
              <span key={value} className="math-chip">{value}</span>
            ))}
          </div>
          <MathText>
            {`A = {1, 2, 3, 5}，B = {2, 3, 4, 6}。${active.label}保留${
              operation === 'union'
                ? '至少属于一个集合'
                : operation === 'intersection'
                  ? '同时属于两个集合'
                  : '属于 A 但不属于 B'
            }的元素。`}
          </MathText>
        </div>
      </div>
    </section>
  )
}
