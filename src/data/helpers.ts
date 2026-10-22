import type { ContentBlock, Question } from '../types'

export const text = (content: string): ContentBlock => ({ type: 'text', content })
export const formula = (latex: string, label?: string): ContentBlock => ({
  type: 'formula',
  latex,
  label
})
export const tip = (title: string, content: string): ContentBlock => ({
  type: 'callout',
  tone: 'tip',
  title,
  content
})
export const note = (title: string, content: string): ContentBlock => ({
  type: 'callout',
  tone: 'note',
  title,
  content
})
export const warn = (title: string, content: string): ContentBlock => ({
  type: 'callout',
  tone: 'warn',
  title,
  content
})

export function questionsFor(
  chapterId: string,
  questions: Omit<Question, 'chapterId'>[]
): Question[] {
  return questions.map((question) => ({ ...question, chapterId }))
}
