import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { gradeQuiz, recordMistakeReview } from '../lib/quiz'
import { clearProgress, emptyProgress, loadProgress, saveProgress } from '../lib/storage'
import type { ActiveQuiz, Attempt, LearningProgress } from '../types'

interface ProgressContextValue {
  progress: LearningProgress
  markCardComplete: (chapterId: string, cardId: string) => void
  setActiveQuiz: (quiz: ActiveQuiz | null) => void
  submitQuiz: (quiz: ActiveQuiz) => Attempt
  reviewMistake: (questionId: string, correct: boolean) => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LearningProgress>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      markCardComplete: (chapterId, cardId) => {
        setProgress((current) => ({
          ...current,
          completedCards: {
            ...current.completedCards,
            [cardId]: new Date().toISOString()
          },
          lastChapterId: chapterId,
          lastCardId: cardId,
          lastActivityAt: new Date().toISOString()
        }))
      },
      setActiveQuiz: (quiz) => {
        setProgress((current) => ({ ...current, activeQuiz: quiz }))
      },
      submitQuiz: (quiz) => {
        const result = gradeQuiz(quiz, progress)
        setProgress(result.nextProgress)
        return result.attempt
      },
      reviewMistake: (questionId, correct) => {
        setProgress((current) => recordMistakeReview(current, questionId, correct))
      },
      resetProgress: () => {
        clearProgress()
        setProgress({ ...emptyProgress })
      }
    }),
    [progress]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used inside ProgressProvider')
  return context
}
