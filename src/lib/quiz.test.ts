import { describe, expect, it } from 'vitest'
import { emptyProgress } from './storage'
import {
  createChapterQuiz,
  createComprehensiveQuiz,
  gradeQuiz,
  recordMistakeReview
} from './quiz'

describe('quiz generation and grading', () => {
  it('creates a chapter quiz with exactly ten questions', () => {
    const quiz = createChapterQuiz('sets-logic')
    expect(quiz.questionIds).toHaveLength(10)
    expect(new Set(quiz.questionIds).size).toBe(10)
  })

  it('creates a balanced, unique comprehensive quiz', () => {
    const quiz = createComprehensiveQuiz(() => 0.42)
    expect(quiz.questionIds).toHaveLength(20)
    expect(new Set(quiz.questionIds).size).toBe(20)
  })

  it('records wrong questions and clears the active quiz', () => {
    const quiz = createChapterQuiz('sets-logic')
    quiz.answers[quiz.questionIds[0]] = ['A']
    const result = gradeQuiz(quiz, emptyProgress)
    expect(result.attempt.total).toBe(10)
    expect(result.nextProgress.activeQuiz).toBeNull()
    expect(result.attempt.answers.some((answer) => !answer.correct)).toBe(true)
    expect(Object.keys(result.nextProgress.wrongQuestions).length).toBeGreaterThan(0)
  })

  it('marks a mistake mastered after two consecutive correct reviews', () => {
    const progress = {
      ...emptyProgress,
      wrongQuestions: {
        q1: {
          questionId: 'q1',
          wrongCount: 1,
          streak: 0,
          mastered: false,
          lastAttemptAt: '2026-10-22T00:00:00.000Z',
          firstWrongAt: '2026-10-22T00:00:00.000Z'
        }
      }
    }
    const first = recordMistakeReview(progress, 'q1', true)
    const second = recordMistakeReview(first, 'q1', true)
    expect(second.wrongQuestions.q1.streak).toBe(2)
    expect(second.wrongQuestions.q1.mastered).toBe(true)

    const reset = recordMistakeReview(second, 'q1', false)
    expect(reset.wrongQuestions.q1.streak).toBe(0)
    expect(reset.wrongQuestions.q1.mastered).toBe(false)
  })
})
