import { CheckCircle2, Circle, RotateCcw, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnswerInput } from '../components/AnswerInput'
import { MathText } from '../components/MathText'
import { PageHeader } from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { chapterMap } from '../data'
import { isAnswerCorrect, isAnswered } from '../lib/answers'
import { questionMap } from '../lib/quiz'

type Filter = 'pending' | 'mastered'

export function MistakesPage() {
  const { progress, reviewMistake } = useProgress()
  const [filter, setFilter] = useState<Filter>('pending')
  const records = Object.values(progress.wrongQuestions)
    .filter((record) => (filter === 'mastered' ? record.mastered : !record.mastered))
    .sort((a, b) => b.lastAttemptAt.localeCompare(a.lastAttemptAt))
  const [selectedId, setSelectedId] = useState<string | null>(records[0]?.questionId ?? null)
  const [answer, setAnswer] = useState<string[]>([])
  const [feedback, setFeedback] = useState<boolean | null>(null)

  useEffect(() => {
    if (!selectedId || !records.some((record) => record.questionId === selectedId)) {
      setSelectedId(records[0]?.questionId ?? null)
    }
    setAnswer([])
    setFeedback(null)
  }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  const selectedRecord = selectedId ? progress.wrongQuestions[selectedId] : undefined
  const selectedQuestion = selectedId ? questionMap.get(selectedId) : undefined
  const pending = Object.values(progress.wrongQuestions).filter((item) => !item.mastered).length
  const mastered = Object.values(progress.wrongQuestions).filter((item) => item.mastered).length

  function checkAnswer() {
    if (!selectedQuestion || !isAnswered(answer)) return
    const correct = isAnswerCorrect(selectedQuestion, answer)
    setFeedback(correct)
    reviewMistake(selectedQuestion.id, correct)
  }

  return (
    <div className="page mistakes-page">
      <PageHeader
        eyebrow="Mistake review"
        title="错题本"
        description="错题不是负担，而是最清楚的学习线索。连续答对两次即视为掌握。"
      />

      <section className="mistake-stats">
        <div><Target size={22} /><p><strong>{pending}</strong><span>待复习</span></p></div>
        <div><CheckCircle2 size={22} /><p><strong>{mastered}</strong><span>已掌握</span></p></div>
        <div className="mistake-rule">掌握规则：同一道错题连续 2 次重练正确</div>
      </section>

      {Object.keys(progress.wrongQuestions).length === 0 ? (
        <div className="empty-state">
          <RotateCcw size={40} />
          <h2>错题本还是空的</h2>
          <p>完成一次章节小测，答错的题会自动出现在这里。</p>
          <Link className="button primary" to="/tests">去测试中心</Link>
        </div>
      ) : (
        <div className="mistake-workspace">
          <aside className="mistake-list">
            <div className="segmented full">
              <button className={filter === 'pending' ? 'is-active' : ''} onClick={() => setFilter('pending')}>待复习 {pending}</button>
              <button className={filter === 'mastered' ? 'is-active' : ''} onClick={() => setFilter('mastered')}>已掌握 {mastered}</button>
            </div>
            {records.length === 0 ? (
              <p className="empty-list">这个分类暂时没有题目。</p>
            ) : (
              records.map((record) => {
                const question = questionMap.get(record.questionId)
                const chapter = question ? chapterMap.get(question.chapterId) : undefined
                return (
                  <button
                    key={record.questionId}
                    className={selectedId === record.questionId ? 'mistake-list-item is-active' : 'mistake-list-item'}
                    onClick={() => {
                      setSelectedId(record.questionId)
                      setAnswer([])
                      setFeedback(null)
                    }}
                  >
                    <span className="mistake-item-topic">{chapter?.shortTitle} · {question?.topic}</span>
                    <strong>{question?.prompt.replace(/\$[^$]+\$/g, '…').slice(0, 44)}…</strong>
                    <span className="streak-dots">
                      {[0, 1].map((index) => index < record.streak ? <CheckCircle2 key={index} size={14} /> : <Circle key={index} size={14} />)}
                      <small>{record.mastered ? '已掌握' : `连续正确 ${record.streak}/2`}</small>
                    </span>
                  </button>
                )
              })
            )}
          </aside>

          <section className="mistake-practice">
            {selectedRecord && selectedQuestion ? (
              <>
                <div className="question-head">
                  <div>
                    <span className="question-index">错题重练</span>
                    <span className="question-topic">{selectedQuestion.topic}</span>
                  </div>
                  <span className="streak-label">连续正确 {selectedRecord.streak}/2</span>
                </div>
                <h2><MathText>{selectedQuestion.prompt}</MathText></h2>
                <AnswerInput
                  question={selectedQuestion}
                  value={answer}
                  onChange={(value) => {
                    setAnswer(value)
                    setFeedback(null)
                  }}
                  disabled={feedback !== null}
                />
                {feedback !== null && (
                  <div className={`feedback-banner ${feedback ? 'correct' : 'incorrect'}`}>
                    <strong>{feedback ? '回答正确' : '再想一步'}</strong>
                    <p>
                      {feedback
                        ? selectedRecord.streak >= 2
                          ? '达到连续两次正确，这道题已标记为掌握。'
                          : '第一次重练正确，再答对一次即可标记掌握。'
                        : '这道题仍会留在待复习列表，查看解析后再试一次。'}
                    </p>
                  </div>
                )}
                {feedback !== null && (
                  <ol className="solution-steps">
                    {selectedQuestion.steps.map((step, index) => (
                      <li key={step}>
                        <span>{index + 1}</span>
                        <div><p><MathText>{step}</MathText></p></div>
                      </li>
                    ))}
                  </ol>
                )}
                <div className="mistake-practice-actions">
                  <button
                    className="button primary"
                    onClick={checkAnswer}
                    disabled={feedback !== null || !isAnswered(answer)}
                  >
                    检查答案
                  </button>
                  {feedback !== null && (
                    <button
                      className="button secondary"
                      onClick={() => {
                        setAnswer([])
                        setFeedback(null)
                      }}
                    >
                      再练一次
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state compact"><p>选择左侧题目开始复习。</p></div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
