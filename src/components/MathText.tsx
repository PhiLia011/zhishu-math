import katex from 'katex'

function renderFormula(latex: string, displayMode = false): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false
    })
  } catch {
    return latex
  }
}

export function MathText({ children, className = '' }: { children: string; className?: string }) {
  const parts = children.split(/(\$[^$]+\$)/g).filter(Boolean)
  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.startsWith('$') && part.endsWith('$') ? (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderFormula(part.slice(1, -1)) }}
          />
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </span>
  )
}

export function MathBlock({ latex, label }: { latex: string; label?: string }) {
  return (
    <figure className="formula-block">
      {label && <figcaption>{label}</figcaption>}
      <div dangerouslySetInnerHTML={{ __html: renderFormula(latex, true) }} />
    </figure>
  )
}
