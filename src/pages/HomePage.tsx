import { ArrowRight, BookOpenCheck, CheckCircle2, FlaskConical, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ChapterCard } from '../components/ChapterCard'
import { useProgress } from '../context/ProgressContext'
import { allCards, chapterMap, chapters } from '../data'
import { chapterAccuracy, overallAccuracy } from '../lib/quiz'

export function HomePage() {
  const { progress } = useProgress()
  const completed = Object.keys(progress.completedCards).length
  const accuracy = overallAccuracy(progress)
  const lastChapter = progress.lastChapterId ? chapterMap.get(progress.lastChapterId) : undefined
  const firstIncomplete =
    lastChapter?.cards.find((card) => !progress.completedCards[card.id]) ?? lastChapter?.cards[0]
  const continuePath = lastChapter
    ? `/chapter/${lastChapter.id}${firstIncomplete ? `/${firstIncomplete.id}` : ''}`
    : `/chapter/${chapters[0].id}`
  const activeQuiz = progress.activeQuiz

  return (
    <div className="page page-home">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> 看见关系，而不只是记住答案</span>
          <h1>把高中数学<br /><em>真正看明白</em>。</h1>
          <p>
            从集合到概率，用可以拖动的图象、清晰的例题和即时反馈，建立属于自己的数学直觉。
          </p>
          <div className="hero-actions">
            <Link className="button primary" to={activeQuiz ? '/quiz/resume' : continuePath}>
              {activeQuiz ? '继续上次测试' : lastChapter ? '继续学习' : '开始第一课'}
              <ArrowRight size={18} />
            </Link>
            <Link className="button secondary" to="/tests">去测试一下</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-axis x" />
          <div className="hero-axis y" />
          <svg viewBox="0 0 420 300">
            <path d="M25 235 C105 220 125 62 210 96 C290 128 310 238 395 48" className="hero-curve" />
            <circle cx="210" cy="96" r="10" className="hero-point" />
            <text x="228" y="89">f(x)</text>
            <path d="M70 245 L150 120 L240 210 L335 90" className="hero-vector" />
            <circle cx="150" cy="120" r="6" className="hero-point secondary" />
          </svg>
          <div className="floating-formula formula-one">a² + b² = c²</div>
          <div className="floating-formula formula-two">sin²θ + cos²θ = 1</div>
        </div>
      </section>

      <section className="quick-stats" aria-label="学习概况">
        <div>
          <span className="stat-icon coral"><BookOpenCheck size={20} /></span>
          <p><strong>{completed}<small>/{allCards.length}</small></strong><span>已完成知识卡</span></p>
        </div>
        <div>
          <span className="stat-icon green"><CheckCircle2 size={20} /></span>
          <p><strong>{accuracy === null ? '—' : `${accuracy}%`}</strong><span>累计答题正确率</span></p>
        </div>
        <div>
          <span className="stat-icon gold"><FlaskConical size={20} /></span>
          <p><strong>{progress.attempts.length}</strong><span>已完成的测试</span></p>
        </div>
        <div className="stat-continue">
          <span>下一步</span>
          <Link to={continuePath}>{lastChapter ? `继续「${lastChapter.shortTitle}」` : '从集合开始'} <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">九章学习地图</span>
            <h2>按自己的节奏推进</h2>
          </div>
          <p>每章都配有知识卡、精讲例题与 10 道练习。</p>
        </div>
        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              completed={chapter.cards.filter((card) => progress.completedCards[card.id]).length}
              accuracy={chapterAccuracy(progress, chapter.id)}
            />
          ))}
        </div>
      </section>

      <section className="home-closing">
        <div>
          <span className="eyebrow">练习闭环</span>
          <h2>做错不可怕，<br />关键是把错题变成掌握。</h2>
        </div>
        <div className="closing-steps">
          <span><b>01</b>章节小测即时判分</span>
          <span><b>02</b>错题自动收集与重练</span>
          <span><b>03</b>连续答对两次标记掌握</span>
        </div>
        <Link className="button light" to="/mistakes">打开错题本 <ArrowRight size={18} /></Link>
      </section>
    </div>
  )
}
