import { Navigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'

export function ResumeRedirect() {
  const { progress } = useProgress()
  const quiz = progress.activeQuiz
  if (!quiz) return <Navigate to="/tests" replace />
  return (
    <Navigate
      to={quiz.mode === 'comprehensive' ? '/quiz/comprehensive' : `/quiz/chapter/${quiz.chapterId}`}
      replace
    />
  )
}
