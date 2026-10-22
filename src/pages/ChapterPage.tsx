import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ListChecks,
  PencilLine
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { MathBlock, MathText } from '../components/MathText'
import { InteractiveBlock } from '../components/interactives/InteractiveBlock'
import { useProgress } from '../context/ProgressContext'
import { chapterMap } from '../data'
import type { ContentBlock, Example } from '../types'

export function ChapterPage() {
  const { chapterId, cardId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { progress, markCardComplete } = useProgress()
  const chapter = chapterId ? chapterMap.get(chapterId) : undefined

  useEffect(() => {
    if (!chapter) return
    document.title = `${chapter.title} · 知数`
    return () => {
      document.title = '知数 · 高中数学互动学习'
    }
  }, [chapter])

  if (!chapter) return <Navigate to="/" replace />

  const view = searchParams.get('view') === 'examples' ? 'examples' : 'learn'
  const activeCard =
    chapter.cards.find((card) => card.id === cardId) ??
    chapter.cards.find((card) => !progress.completedCards[card.id]) ??
    chapter.cards[0]
  const activeIndex = chapter.cards.findIndex((card) => card.id === activeCard.id)
  const chapterCompleted = chapter.cards.filter((card) => progress.completedCards[card.id]).length
  const percent = Math.round((chapterCompleted / chapter.cards.length) * 100)

  function selectCard(id: string) {
    setSearchParams({})
    navigate(`/chapter/${chapter!.id}/${id}`)
  }

  function completeAndContinue() {
    markCardComplete(chapter!.id, activeCard.id)
    const next = chapter!.cards[activeIndex + 1]
    if (next) navigate(`/chapter/${chapter!.id}/${next.id}`)
    else setSearchParams({ view: 'examples' })
  }

  return (
    <div className="page chapter-page">
      <header className="chapter-hero" style={{ '--chapter-color': chapter.color } as React.CSSProperties}>
        <div className="chapter-breadcrumb">
          <Link to="/"><ArrowLeft size={15} />学习地图</Link>
          <span>第 {chapter.order} 章</span>
        </div>
        <div className="chapter-hero-main">
          <div>
            <span className="chapter-badge">{chapter.icon}</span>
            <h1>{chapter.title}</h1>
            <p>{chapter.description}</p>
          </div>
          <div className="chapter-overview">
            <strong>{percent}%</strong>
            <span>本章进度</span>
            <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
          </div>
        </div>
        <div className="chapter-tabs">
          <button
            className={view === 'learn' ? 'is-active' : ''}
            onClick={() => setSearchParams({})}
          >
            <PencilLine size={17} />知识卡
          </button>
          <button
            className={view === 'examples' ? 'is-active' : ''}
            onClick={() => setSearchParams({ view: 'examples' })}
          >
            <Lightbulb size={17} />精讲例题
          </button>
          <Link to={`/quiz/chapter/${chapter.id}`}><ListChecks size={17} />章节小测</Link>
        </div>
      </header>

      {view === 'examples' ? (
        <section className="examples-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">跟着步骤思考</span>
              <h2>两道精讲例题</h2>
            </div>
            <p>先独立尝试，再展开提示和完整解答。</p>
          </div>
          <div className="example-list">
            {chapter.examples.map((example, index) => (
              <ExampleCard key={example.id} example={example} number={index + 1} />
            ))}
          </div>
          <div className="practice-cta">
            <div>
              <span className="eyebrow">检验理解</span>
              <h2>准备好了吗？</h2>
              <p>用 10 道题检查本章掌握情况，答完立即查看解析。</p>
            </div>
            <Link className="button primary" to={`/quiz/chapter/${chapter.id}`}>
              开始章节小测 <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      ) : (
        <div className="chapter-workspace">
          <aside className="lesson-sidebar">
            <div className="lesson-sidebar-title">
              <span>知识卡</span>
              <strong>{chapterCompleted}/{chapter.cards.length}</strong>
            </div>
            {chapter.cards.map((card, index) => {
              const done = Boolean(progress.completedCards[card.id])
              return (
                <button
                  key={card.id}
                  className={`lesson-nav-item ${card.id === activeCard.id ? 'is-active' : ''}`}
                  onClick={() => selectCard(card.id)}
                >
                  <span className={`lesson-number ${done ? 'is-done' : ''}`}>
                    {done ? <Check size={14} /> : index + 1}
                  </span>
                  <span>{card.title}</span>
                </button>
              )
            })}
          </aside>

          <article className="lesson-content">
            <div className="lesson-kicker">
              <span>知识卡 {String(activeIndex + 1).padStart(2, '0')}</span>
              {progress.completedCards[activeCard.id] && <span className="completed-pill"><CheckCircle2 size={14} />已学习</span>}
            </div>
            <h2>{activeCard.title}</h2>
            <p className="lesson-summary">{activeCard.summary}</p>
            <div className="content-blocks">
              {activeCard.blocks.map((block, index) => (
                <ContentBlockView key={`${activeCard.id}-${index}`} block={block} />
              ))}
            </div>
            {activeCard.interaction && <InteractiveBlock kind={activeCard.interaction} />}
            <footer className="lesson-footer">
              <button
                className="button secondary"
                disabled={activeIndex === 0}
                onClick={() => navigate(`/chapter/${chapter.id}/${chapter.cards[activeIndex - 1].id}`)}
              >
                <ChevronLeft size={18} />上一张
              </button>
              <button className="button primary" onClick={completeAndContinue}>
                {activeIndex === chapter.cards.length - 1 ? '完成知识卡' : '学完，继续'}
                {activeIndex === chapter.cards.length - 1 ? <Check size={18} /> : <ChevronRight size={18} />}
              </button>
            </footer>
          </article>
        </div>
      )}
    </div>
  )
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  if (block.type === 'text') {
    return <p className="prose"><MathText>{block.content}</MathText></p>
  }
  if (block.type === 'formula') {
    return <MathBlock latex={block.latex} label={block.label} />
  }
  return (
    <aside className={`callout ${block.tone}`}>
      <span className="callout-icon">{block.tone === 'tip' ? '✓' : block.tone === 'warn' ? '!' : 'i'}</span>
      <div>
        <strong>{block.title}</strong>
        <p><MathText>{block.content}</MathText></p>
      </div>
    </aside>
  )
}

function ExampleCard({ example, number }: { example: Example; number: number }) {
  const [showHint, setShowHint] = useState(false)
  return (
    <article className="example-card">
      <header>
        <span className="example-number">{String(number).padStart(2, '0')}</span>
        <h3>{example.title.replace(/^例题\s*\d+\s*·\s*/, '')}</h3>
      </header>
      <div className="example-prompt"><MathText>{example.prompt}</MathText></div>
      <button className="hint-toggle" onClick={() => setShowHint((value) => !value)}>
        <Lightbulb size={16} />
        {showHint ? '收起提示' : '需要一点提示？'}
      </button>
      {showHint && <div className="hint-box"><MathText>{example.hint}</MathText></div>}
      <ol className="solution-steps">
        {example.steps.map((step, index) => (
          <li key={step.title}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              <p><MathText>{step.content}</MathText></p>
            </div>
          </li>
        ))}
      </ol>
      <div className="example-answer">
        <span>答案</span>
        <p><MathText>{example.answer}</MathText></p>
      </div>
    </article>
  )
}
