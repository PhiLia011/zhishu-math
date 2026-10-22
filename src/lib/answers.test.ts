import { describe, expect, it } from 'vitest'
import type { Question } from '../types'
import { isAnswerCorrect, normalizeText, parseNumeric } from './answers'

const base: Question = {
  id: 'test',
  chapterId: 'test',
  topic: '测试',
  type: 'single',
  prompt: '测试题',
  options: [
    { id: 'A', text: 'A' },
    { id: 'B', text: 'B' }
  ],
  answer: ['A'],
  hint: '',
  steps: [],
  difficulty: 1
}

describe('answer grading', () => {
  it('normalizes full-width punctuation and whitespace', () => {
    expect(normalizeText(' １２， 3 ')).toBe('12,3')
  })

  it('grades single choice exactly', () => {
    expect(isAnswerCorrect(base, ['A'])).toBe(true)
    expect(isAnswerCorrect(base, ['B'])).toBe(false)
    expect(isAnswerCorrect(base, [])).toBe(false)
  })

  it('grades multiple choice as an unordered exact set', () => {
    const question: Question = { ...base, type: 'multiple', answer: ['A', 'C'] }
    expect(isAnswerCorrect(question, ['C', 'A'])).toBe(true)
    expect(isAnswerCorrect(question, ['A'])).toBe(false)
    expect(isAnswerCorrect(question, ['A', 'B', 'C'])).toBe(false)
  })

  it('parses fractions and percentages', () => {
    expect(parseNumeric('3/5')).toBe(0.6)
    expect(parseNumeric('60%')).toBe(0.6)
    expect(parseNumeric('1/0')).toBeNull()
  })

  it('applies numeric tolerance', () => {
    const question: Question = {
      ...base,
      type: 'numeric',
      answer: ['0.6'],
      tolerance: 0.001
    }
    expect(isAnswerCorrect(question, ['3/5'])).toBe(true)
    expect(isAnswerCorrect(question, ['0.6011'])).toBe(false)
  })
})
