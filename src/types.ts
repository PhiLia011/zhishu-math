export type QuestionType = 'single' | 'multiple' | 'numeric'
export type InteractionKind = 'venn' | 'function' | 'unitCircle' | 'vector'

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  chapterId: string
  topic: string
  type: QuestionType
  prompt: string
  options?: QuestionOption[]
  answer: string[]
  tolerance?: number
  hint: string
  steps: string[]
  difficulty: 1 | 2 | 3
}

export type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'formula'; latex: string; label?: string }
  | {
      type: 'callout'
      tone: 'tip' | 'note' | 'warn'
      title: string
      content: string
    }

export interface KnowledgeCard {
  id: string
  title: string
  summary: string
  blocks: ContentBlock[]
  interaction?: InteractionKind
}

export interface ExampleStep {
  title: string
  content: string
}

export interface Example {
  id: string
  title: string
  prompt: string
  hint: string
  steps: ExampleStep[]
  answer: string
}

export interface Chapter {
  id: string
  order: number
  title: string
  shortTitle: string
  description: string
  color: string
  icon: string
  cards: KnowledgeCard[]
  examples: Example[]
  questions: Question[]
}

export interface AttemptAnswer {
  questionId: string
  answer: string[]
  correct: boolean
}

export interface Attempt {
  id: string
  mode: 'chapter' | 'comprehensive' | 'mistakes'
  chapterId?: string
  startedAt: string
  completedAt: string
  answers: AttemptAnswer[]
  score: number
  total: number
}

export interface WrongQuestionRecord {
  questionId: string
  wrongCount: number
  streak: number
  mastered: boolean
  lastAttemptAt: string
  firstWrongAt: string
}

export interface ActiveQuiz {
  mode: 'chapter' | 'comprehensive'
  chapterId?: string
  questionIds: string[]
  answers: Record<string, string[]>
  startedAt: string
}

export interface LearningProgress {
  version: 1
  completedCards: Record<string, string>
  attempts: Attempt[]
  wrongQuestions: Record<string, WrongQuestionRecord>
  activeQuiz: ActiveQuiz | null
  lastChapterId?: string
  lastCardId?: string
  lastActivityAt?: string
}
