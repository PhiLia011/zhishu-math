import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lightbulb,
  Send
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnswerInput } from '../components/AnswerInput'
import { MathText } from '../components/MathText'
import { useProgress } from '../context/ProgressContext'
import { chapterMap } from '../data'
import { isAnswered } from '../lib/answers'
import {
  createChapterQuiz,
  createComprehensiveQuiz,
  questionMap
} from '../lib/quiz'
import type { ActiveQuiz } from '../types'

export function QuizPage() {
  const { mode, chapterId } = useParams()
  const navigate = useNavigate()
  const { progress, setActiveQuiz, submitQuiz } = useProgress()
  const typedMode =
    mode === 'comprehensive'
      ? 'comprehensive'
      : mode === 'chapter' || chapterId
        ? 'chapter'
        : null
  const chapter = chapterId ? chapterMap.get(chapterId) : undefined
  const validRoute =
    typedMode === 'comprehensive'
      ? !chapterId
      : typedMode === 'chapter' && Boolean(chapter)

  const [quiz, setQuiz] = useState<ActiveQuiz | null>(() => {
    if (!validRoute || !typedMode) return null
    const existing = progress.activeQuiz
    const sameMode = existing?.mode === typedMode
    const sameChapter = typedMode === 'comprehensive' || existing?.chapterId === chapterId
    if (existing && sameMode && sameChapter) return existing
    return typedMode === 'comprehensive'
      ? createComprehensiveQuiz()
      : createChapterQuiz(chapterId ?? '')
  })
  const [current, setCurrent] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [warning, setWarning] = useState('')

  useEffect(() => {
    if (quiz) setActiveQuiz(quiz)
    // The active session is captured once when entering the test.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const questions = useMemo(
    () =>
      (quiz?.questionIds ?? [])
        .map((id) => questionMap.get(id))
        .filter((question) => question !== undefined),
    [quiz]
  )
  const question = questions[current]
  const answered = questions.filter((item) => isAnswered(quiz?.answers[item.id])).length
  const percent = questions.length ? Math.round((answered / questions.length) * 100) : 0

  if (!typedMode || !validRoute || !quiz || !question) {
    return <Navigate to="/tests" replace />
  }

  const activeQuiz = quiz
  const title = typedMode === 'comprehensive' ? '综合能力卷' : `${chapter?.shortTitle} · 章节小测`

  function updateAnswer(answer: string[]) {
    const nextQuiz: ActiveQuiz = {
      ...activeQuiz,
      answers: {
        ...activeQuiz.answers,
        [question.id]: answer
      }
    }
    setQuiz(nextQuiz)
    setActiveQuiz(nextQuiz)
    setWarning('')
  }

  function handleSubmit() {
    const unanswered = questions.filter((item) => !isAnswered(activeQuiz.answers[item.id])).length
    if (unanswered > 0) {
      setWarning(`还有 ${unanswered} 道题未作答；完成全部题目后再交卷。`)
      return
    }
    const attempt = submitQuiz(activeQuiz)
    navigate(`/results/${attempt.id}`)
  }

  return (
    <div className="page quiz-page">
      <header className="quiz-topbar">
        <Link to="/tests" className="icon-button" aria-label="退出测试"><ArrowLeft size={20} /></Link>
        <div>
          <span className="eyebrow">{typedMode === 'comprehensive' ? 'Comprehensive test' : 'Chapter quiz'}</span>
          <h1>{title}</h1>
        </div>
        <div className="quiz-status">
          <span><Clock3 size={15} />自动保存</span>
          <strong>{answered}/{questions.length} 已答</strong>
        </div>
      </header>

      <div className="quiz-progress"><span style={{ width: `${percent}%` }} /></div>

      <div className="quiz-layout">
        <section className="quiz-question-card">
          <div className="question-head">
            <div>
              <span className="question-index">第 {current + 1} 题</span>
              <span className="question-topic">{question.topic}</span>
            </div>
            <span className={`difficulty difficulty-${question.difficulty}`}>
              {'●'.repeat(question.difficulty)}{'○'.repeat(3 - question.difficulty)}
            </span>
          </div>
          <h2><MathText>{question.prompt}</MathText></h2>
          {question.type === 'multiple' && <p className="question-note">本题为多选题，需选择所有正确选项。</p>}
          <AnswerInput
            question={question}
            value={quiz.answers[question.id] ?? []}
            onChange={updateAnswer}
          />
          <button className="hint-toggle small-hint" onClick={() => setShowHint((value) => !value)}>
            <Lightbulb size={16} />{showHint ? '收起提示' : '查看提示'}
          </button>
          {showHint && <div className="hint-box"><MathText>{question.hint}</MathText></div>}

          {warning && <div className="form-warning">{warning}</div>}

          <footer className="quiz-controls">
            <button
              className="button secondary"
              disabled={current === 0}
              onClick={() => {
                setCurrent((value) => value - 1)
                setShowHint(false)
              }}
            >
              <ChevronLeft size={18} />上一题
            </button>
            {current < questions.length - 1 ? (
              <button
                className="button primary"
                onClick={() => {
                  setCurrent((value) => value + 1)
                  setShowHint(false)
                }}
              >
                下一题<ChevronRight size={18} />
              </button>
            ) : (
              <button className="button primary" onClick={handleSubmit}>
                提交试卷<Send size={17} />
              </button>
            )}
          </footer>
        </section>

        <aside className="question-navigator">
          <div className="navigator-head">
            <strong>答题卡</strong>
            <span>{percent}%</span>
          </div>
          <div className="question-grid">
            {questions.map((item, index) => (
              <button
                key={item.id}
                className={`${index === current ? 'is-current' : ''} ${isAnswered(quiz.answers[item.id]) ? 'is-answered' : ''}`}
                onClick={() => {
                  setCurrent(index)
                  setShowHint(false)
                }}
                aria-label={`第 ${index + 1} 题${isAnswered(quiz.answers[item.id]) ? '，已作答' : '，未作答'}`}
              >
                {isAnswered(quiz.answers[item.id]) && index !== current ? <Check size={14} /> : index + 1}
              </button>
            ))}
          </div>
          <div className="navigator-legend">
            <span><i className="answered" />已答</span>
            <span><i />未答</span>
          </div>
          <button className="button submit-side" onClick={handleSubmit}>提交全部答案 <ArrowRight size={17} /></button>
          <p className="navigator-note">离开页面不会丢失答案，可从测试中心继续。</p>
        </aside>
      </div>
    </div>
  )
}
