import { chapters } from '../src/data'

const errors: string[] = []
const ids = new Set<string>()
const cardIds = new Set<string>()
const exampleIds = new Set<string>()
const questionIds = new Set<string>()

if (chapters.length !== 9) errors.push(`Expected 9 chapters, found ${chapters.length}.`)

for (const chapter of chapters) {
  if (chapter.cards.length !== 8) {
    errors.push(`${chapter.id}: expected 8 knowledge cards, found ${chapter.cards.length}.`)
  }
  if (chapter.examples.length !== 2) {
    errors.push(`${chapter.id}: expected 2 examples, found ${chapter.examples.length}.`)
  }
  if (chapter.questions.length !== 10) {
    errors.push(`${chapter.id}: expected 10 questions, found ${chapter.questions.length}.`)
  }

  const types = chapter.questions.reduce<Record<string, number>>((counts, question) => {
    counts[question.type] = (counts[question.type] ?? 0) + 1
    return counts
  }, {})
  if (types.single !== 7 || types.multiple !== 2 || types.numeric !== 1) {
    errors.push(
      `${chapter.id}: expected 7 single, 2 multiple, 1 numeric; found ${JSON.stringify(types)}.`
    )
  }

  if (ids.has(chapter.id)) errors.push(`Duplicate chapter id: ${chapter.id}`)
  ids.add(chapter.id)

  for (const card of chapter.cards) {
    if (cardIds.has(card.id)) errors.push(`Duplicate card id: ${card.id}`)
    cardIds.add(card.id)
    if (!card.title || !card.summary || card.blocks.length === 0) {
      errors.push(`${card.id}: incomplete card.`)
    }
  }

  for (const example of chapter.examples) {
    if (exampleIds.has(example.id)) errors.push(`Duplicate example id: ${example.id}`)
    exampleIds.add(example.id)
    if (example.steps.length < 2 || !example.answer) errors.push(`${example.id}: incomplete example.`)
  }

  for (const question of chapter.questions) {
    if (questionIds.has(question.id)) errors.push(`Duplicate question id: ${question.id}`)
    questionIds.add(question.id)
    if (question.chapterId !== chapter.id) errors.push(`${question.id}: chapter id mismatch.`)
    if (!question.topic || !question.prompt || !question.hint || question.steps.length === 0) {
      errors.push(`${question.id}: incomplete question content.`)
    }
    if (question.type === 'numeric') {
      if (question.answer.length !== 1 || Number.isNaN(Number(question.answer[0]))) {
        errors.push(`${question.id}: invalid numeric answer.`)
      }
    } else {
      const optionIds = new Set(question.options?.map((option) => option.id) ?? [])
      if (optionIds.size < 2) errors.push(`${question.id}: missing options.`)
      for (const answer of question.answer) {
        if (!optionIds.has(answer)) errors.push(`${question.id}: answer ${answer} not in options.`)
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const questionCount = chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0)
console.log(
  `Content valid: ${chapters.length} chapters, ${cardIds.size} cards, ${exampleIds.size} examples, ${questionCount} questions.`
)
