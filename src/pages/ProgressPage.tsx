import { BarChart3, BookOpenCheck, RotateCcw, Target, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ScoreRing } from '../components/ScoreRing'
import { useProgress } from '../context/ProgressContext'
import { allCards, chapters } from '../data'
import {
  chapterAccuracy,
  overallAccuracy,
  strongestAndWeakest
} from '../lib/quiz'

export function ProgressPage() {
  const { progress, resetProgress } = useProgress()
  const [confirmReset, setConfirmReset] = useState(false)
  const accuracy = overallAccuracy(progress)
  const completedCards = Object.keys(progress.completedCards).length
  const { strongest, weakest } = strongestAndWeakest(progress)
  const pendingMistakes = Object.values(progress.wrongQuestions).filter((item) => !item.mastered).length

  return (
    <div className="page progress-page">
      <PageHeader
        eyebrow="Learning report"
        title="学习报告"
        description="把学习过程变成清晰的数据，找到下一步最值得投入的方向。"
        action={<button className="button ghost" onClick={() => setConfirmReset(true)}><RotateCcw size={16} />重置进度</button>}
      />

      <section className="report-hero">
        <ScoreRing value={accuracy ?? 0} label={accuracy === null ? '等待首次测试' : '累计正确率'} />
        <div className="report-highlights">
          <div><BookOpenCheck size={21} /><span><strong>{completedCards}/{allCards.length}</strong>已完成知识卡</span></div>
          <div><BarChart3 size={21} /><span><strong>{progress.attempts.length}</strong>已完成测试</span></div>
          <div><Target size={21} /><span><strong>{pendingMistakes}</strong>待复习错题</span></div>
        </div>
        <div className="report-insight">
          <span className="eyebrow">学习建议</span>
          {accuracy === null ? (
            <>
              <h2>从一次章节小测开始</h2>
              <p>测试后，这里会根据你的答题记录给出章节强弱分析。</p>
            </>
          ) : (
            <>
              <h2>{weakest ? `优先补强「${weakest.shortTitle}」` : '继续保持学习节奏'}</h2>
              <p>
                {weakest
                  ? `当前最低正确率出现在这一章；建议先回看知识卡，再完成错题重练。`
                  : '完成更多章节测试后，会生成更准确的强弱分析。'}
              </p>
              {strongest && <span className="insight-tag"><Trophy size={14} />优势章节：{strongest.shortTitle}</span>}
            </>
          )}
          <Link to="/tests" className="text-link">去做一次测试 →</Link>
        </div>
      </section>

      <section className="chapter-performance">
        <div className="section-heading">
          <div><span className="eyebrow">章节表现</span><h2>九章掌握概览</h2></div>
          <p>浅色条表示知识卡完成率，数字为累计答题正确率。</p>
        </div>
        <div className="performance-list">
          {chapters.map((chapter) => {
            const chapterDone = chapter.cards.filter((card) => progress.completedCards[card.id]).length
            const cardPercent = Math.round((chapterDone / chapter.cards.length) * 100)
            const chapterAcc = chapterAccuracy(progress, chapter.id)
            return (
              <div className="performance-row" key={chapter.id}>
                <span className="performance-dot" style={{ background: chapter.color }} />
                <div className="performance-main">
                  <div><strong>{chapter.shortTitle}</strong><span>{chapterDone}/{chapter.cards.length} 知识卡</span></div>
                  <div className="dual-progress">
                    <span className="card-progress" style={{ width: `${cardPercent}%`, background: chapter.color }} />
                    <span className="accuracy-progress" style={{ width: `${chapterAcc ?? 0}%` }} />
                  </div>
                </div>
                <strong className={chapterAcc === null ? 'muted' : ''}>{chapterAcc === null ? '—' : `${chapterAcc}%`}</strong>
                <Link to={`/chapter/${chapter.id}`}>学习</Link>
              </div>
            )
          })}
        </div>
      </section>

      <section className="history-section">
        <div className="section-heading">
          <div><span className="eyebrow">测试历史</span><h2>最近记录</h2></div>
        </div>
        {progress.attempts.length === 0 ? (
          <div className="empty-state compact"><p>暂无测试记录。</p></div>
        ) : (
          <div className="attempt-list">
            {progress.attempts.slice(0, 10).map((attempt) => {
              const chapter = chapters.find((item) => item.id === attempt.chapterId)
              return (
                <Link className="attempt-row" to={`/results/${attempt.id}`} key={attempt.id}>
                  <span>{attempt.mode === 'comprehensive' ? '综合能力卷' : chapter?.shortTitle}</span>
                  <span>{new Date(attempt.completedAt).toLocaleString('zh-CN')}</span>
                  <strong>{attempt.score}/{attempt.total}</strong>
                  <span>{Math.round((attempt.score / attempt.total) * 100)}%</span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {confirmReset && (
        <div className="modal-backdrop" role="presentation" onClick={() => setConfirmReset(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="reset-title">重置全部学习进度？</h2>
            <p>知识卡完成记录、测试历史、错题本和未完成的测试都会被清除。此操作无法撤销。</p>
            <div>
              <button className="button secondary" onClick={() => setConfirmReset(false)}>取消</button>
              <button
                className="button danger"
                onClick={() => {
                  resetProgress()
                  setConfirmReset(false)
                }}
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
