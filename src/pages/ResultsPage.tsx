import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { MathText } from '../components/MathText'
import { ScoreRing } from '../components/ScoreRing'
import { useProgress } from '../context/ProgressContext'
import { chapterMap } from '../data'
import { questionMap } from '../lib/quiz'

export function ResultsPage() {
  const { attemptId } = useParams()
  const { progress } = useProgress()
  const attempt = progress.attempts.find((item) => item.id === attemptId)
  if (!attempt) return <Navigate to="/tests" replace />

  const percent = Math.round((attempt.score / attempt.total) * 100)
  const title =
    attempt.mode === 'comprehensive'
      ? '综合能力卷'
      : `${chapterMap.get(attempt.chapterId ?? '')?.shortTitle ?? '章节小测'}`
  const answeredQuestions = attempt.answers
    .map((answer) => ({ ...answer, question: questionMap.get(answer.questionId) }))
    .filter((item) => item.question)

  return (
    <div className="page results-page">
      <header className="results-hero">
        <div className="results-copy">
          <span className="eyebrow">测试完成</span>
          <h1>{percent >= 80 ? '掌握得很扎实。' : percent >= 60 ? '基础已经建立，继续补强。' : '这是一张有价值的诊断卷。'}</h1>
          <p>{title} · {new Date(attempt.completedAt).toLocaleString('zh-CN')}</p>
          <div className="results-actions">
            <Link className="button secondary" to="/tests"><ArrowLeft size={17} />返回测试中心</Link>
            <Link className="button primary" to="/mistakes">复习错题<ArrowRight size={17} /></Link>
          </div>
        </div>
        <ScoreRing value={percent} label="本次正确率" />
      </header>

      <section className="result-summary-grid">
        <div><span>答对</span><strong>{attempt.score}</strong><small>题</small></div>
        <div><span>答错</span><strong>{attempt.total - attempt.score}</strong><small>题</small></div>
        <div><span>总题数</span><strong>{attempt.total}</strong><small>题</small></div>
        <div><span>正确率</span><strong>{percent}</strong><small>%</small></div>
      </section>

      <section className="result-breakdown">
        <div className="section-heading">
          <div><span className="eyebrow">逐题复盘</span><h2>看清每一道题</h2></div>
          <p>错题已自动加入错题本。</p>
        </div>
        <div className="result-question-list">
          {answeredQuestions.map((item, index) => {
            const question = item.question!
            const chapter = chapterMap.get(question.chapterId)
            return (
              <details className={`result-question ${item.correct ? 'correct' : 'incorrect'}`} key={item.questionId}>
                <summary>
                  <span className="result-state">
                    {item.correct ? <CheckCircle2 size={19} /> : <XCircle size={19} />}
                  </span>
                  <span className="result-q-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="result-q-main">
                    <strong><MathText>{question.prompt}</MathText></strong>
                    <small>{chapter?.shortTitle} · {question.topic}</small>
                  </span>
                  <span className="result-q-status">{item.correct ? '正确' : '需要复习'}</span>
                </summary>
                <div className="result-detail">
                  <div className="answer-comparison">
                    <div>
                      <span>你的答案</span>
                      <strong>{formatAnswer(question, item.answer)}</strong>
                    </div>
                    <div>
                      <span>正确答案</span>
                      <strong>{formatAnswer(question, question.answer)}</strong>
                    </div>
                  </div>
                  <ol className="solution-steps">
                    {question.steps.map((step, stepIndex) => (
                      <li key={step}>
                        <span>{stepIndex + 1}</span>
                        <div><p><MathText>{step}</MathText></p></div>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            )
          })}
        </div>
      </section>

      <section className="retry-strip">
        <div><RotateCcw size={24} /><span><strong>间隔一段时间再做一次</strong><small>把“这次会了”变成稳定掌握</small></span></div>
        <Link
          className="button light"
          to={attempt.mode === 'comprehensive' ? '/quiz/comprehensive' : `/quiz/chapter/${attempt.chapterId}`}
        >
          再测一次
        </Link>
      </section>
    </div>
  )
}

function formatAnswer(
  question: ReturnType<typeof questionMap.get>,
  answer: string[]
): string {
  if (!question) return '—'
  if (question.type === 'numeric') return answer[0] || '未作答'
  return answer.length ? answer.join('、') : '未作答'
}
