import { chapters } from '../data'
import type { ActiveQuiz, Attempt, LearningProgress, Question } from '../types'
import { isAnswerCorrect } from './answers'

export const allQuestions = chapters.flatMap((chapter) => chapter.questions)
export const questionMap = new Map(allQuestions.map((question) => [question.id, question]))

export function createChapterQuiz(chapterId: string): ActiveQuiz {
  const chapter = chapters.find((item) => item.id === chapterId)
  if (!chapter) throw new Error(`Unknown chapter: ${chapterId}`)
  return {
    mode: 'chapter',
    chapterId,
    questionIds: chapter.questions.map((question) => question.id),
    answers: {},
    startedAt: new Date().toISOString()
  }
}

export function createComprehensiveQuiz(random = Math.random): ActiveQuiz {
  const selected: string[] = chapters.flatMap((chapter) => {
    const shuffled = [...chapter.questions].sort(() => random() - 0.5)
    return shuffled.slice(0, 2).map((question) => question.id)
  })

  const remaining = allQuestions.filter((question) => !selected.includes(question.id))
  while (selected.length < 20) {
    const index = Math.floor(random() * remaining.length)
    selected.push(remaining.splice(index, 1)[0].id)
  }

  return {
    mode: 'comprehensive',
    questionIds: selected.sort(() => random() - 0.5),
    answers: {},
    startedAt: new Date().toISOString()
  }
}

export function gradeQuiz(
  quiz: ActiveQuiz,
  progress: LearningProgress,
  completedAt = new Date().toISOString()
): { attempt: Attempt; nextProgress: LearningProgress } {
  const questions = quiz.questionIds
    .map((id) => questionMap.get(id))
    .filter((question): question is Question => Boolean(question))

  const answers = questions.map((question) => ({
    questionId: question.id,
    answer: quiz.answers[question.id] ?? [],
    correct: isAnswerCorrect(question, quiz.answers[question.id] ?? [])
  }))
  const score = answers.filter((item) => item.correct).length

  const attempt: Attempt = {
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    mode: quiz.mode,
    chapterId: quiz.chapterId,
    startedAt: quiz.startedAt,
    completedAt,
    answers,
    score,
    total: questions.length
  }

  const wrongQuestions = { ...progress.wrongQuestions }
  for (const answer of answers) {
    if (!answer.correct) {
      const previous = wrongQuestions[answer.questionId]
      wrongQuestions[answer.questionId] = {
        questionId: answer.questionId,
        wrongCount: (previous?.wrongCount ?? 0) + 1,
        streak: 0,
        mastered: false,
        firstWrongAt: previous?.firstWrongAt ?? completedAt,
        lastAttemptAt: completedAt
      }
    }
  }

  return {
    attempt,
    nextProgress: {
      ...progress,
      attempts: [attempt, ...progress.attempts],
      wrongQuestions,
      activeQuiz: null,
      lastActivityAt: completedAt
    }
  }
}

export function recordMistakeReview(
  progress: LearningProgress,
  questionId: string,
  correct: boolean,
  reviewedAt = new Date().toISOString()
): LearningProgress {
  const previous = progress.wrongQuestions[questionId]
  if (!previous) return progress

  const streak = correct ? previous.streak + 1 : 0
  return {
    ...progress,
    wrongQuestions: {
      ...progress.wrongQuestions,
      [questionId]: {
        ...previous,
        streak,
        mastered: streak >= 2,
        lastAttemptAt: reviewedAt
      }
    },
    lastActivityAt: reviewedAt
  }
}

export function chapterMastery(progress: LearningProgress, chapterId: string): number {
  const chapter = chapters.find((item) => item.id === chapterId)
  if (!chapter) return 0
  const completed = chapter.cards.filter((card) => progress.completedCards[card.id]).length
  return Math.round((completed / chapter.cards.length) * 100)
}

export function chapterAccuracy(progress: LearningProgress, chapterId: string): number | null {
  const answers = progress.attempts
    .filter((attempt) => attempt.chapterId === chapterId)
    .flatMap((attempt) => attempt.answers)
  if (answers.length === 0) return null
  return Math.round((answers.filter((answer) => answer.correct).length / answers.length) * 100)
}

export function overallAccuracy(progress: LearningProgress): number | null {
  const answers = progress.attempts.flatMap((attempt) => attempt.answers)
  if (answers.length === 0) return null
  return Math.round((answers.filter((answer) => answer.correct).length / answers.length) * 100)
}

export function strongestAndWeakest(progress: LearningProgress) {
  const ranked = chapters
    .map((chapter) => ({
      chapter,
      accuracy: chapterAccuracy(progress, chapter.id)
    }))
    .filter((item): item is { chapter: (typeof chapters)[number]; accuracy: number } =>
      item.accuracy !== null
    )
    .sort((a, b) => b.accuracy - a.accuracy)

  return {
    strongest: ranked[0]?.chapter,
    weakest: ranked.at(-1)?.chapter
  }
}
