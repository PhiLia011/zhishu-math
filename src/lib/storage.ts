import type { LearningProgress } from '../types'

const STORAGE_KEY = 'zhishu-progress-v1'

export const emptyProgress: LearningProgress = {
  version: 1,
  completedCards: {},
  attempts: [],
  wrongQuestions: {},
  activeQuiz: null
}

export function loadProgress(): LearningProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return emptyProgress
    const parsed = JSON.parse(stored) as Partial<LearningProgress>
    if (parsed.version !== 1) return emptyProgress
    return {
      ...emptyProgress,
      ...parsed,
      completedCards: parsed.completedCards ?? {},
      attempts: parsed.attempts ?? [],
      wrongQuestions: parsed.wrongQuestions ?? {},
      activeQuiz: parsed.activeQuiz ?? null
    }
  } catch {
    return emptyProgress
  }
}

export function saveProgress(progress: LearningProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Learning still works if storage is unavailable.
  }
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY)
}
