import { describe, expect, it } from 'vitest'
import { allCards, allExamples, allQuestions, chapters } from '.'

describe('content contract', () => {
  it('contains the promised chapter, card, example and question counts', () => {
    expect(chapters).toHaveLength(9)
    expect(allCards).toHaveLength(72)
    expect(allExamples).toHaveLength(18)
    expect(allQuestions).toHaveLength(90)
  })

  it('has the required question mix in every chapter', () => {
    for (const chapter of chapters) {
      expect(chapter.questions).toHaveLength(10)
      expect(chapter.questions.filter((question) => question.type === 'single')).toHaveLength(7)
      expect(chapter.questions.filter((question) => question.type === 'multiple')).toHaveLength(2)
      expect(chapter.questions.filter((question) => question.type === 'numeric')).toHaveLength(1)
    }
  })

  it('uses globally unique IDs', () => {
    const ids = [
      ...chapters.map((chapter) => chapter.id),
      ...allCards.map((card) => card.id),
      ...allExamples.map((example) => example.id),
      ...allQuestions.map((question) => question.id)
    ]
    expect(new Set(ids).size).toBe(ids.length)
  })
})
