import type { Question } from '../types'

export function normalizeText(value: string): string {
  return value
    .trim()
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replaceAll('，', ',')
    .replaceAll('。', '.')
    .replaceAll('．', '.')
    .replaceAll('＋', '+')
    .replaceAll('－', '-')
    .replace(/\s+/g, '')
    .replaceAll('％', '%')
}

export function parseNumeric(value: string): number | null {
  const normalized = normalizeText(value).replaceAll('−', '-')
  if (!normalized) return null
  const percent = normalized.endsWith('%')
  const body = percent ? normalized.slice(0, -1) : normalized
  const fraction = body.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/)
  if (fraction) {
    const denominator = Number(fraction[2])
    if (denominator === 0) return null
    const value = Number(fraction[1]) / denominator
    return percent ? value / 100 : value
  }
  const parsed = Number(body)
  if (!Number.isFinite(parsed)) return null
  return percent ? parsed / 100 : parsed
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.map(normalizeText))].sort()
}

export function isAnswerCorrect(question: Question, submitted: string[]): boolean {
  if (question.type === 'numeric') {
    if (submitted.length !== 1) return false
    const actual = parseNumeric(submitted[0])
    const expected = parseNumeric(question.answer[0])
    if (actual === null || expected === null) return false
    return Math.abs(actual - expected) <= (question.tolerance ?? 1e-6)
  }

  const expected = uniqueSorted(question.answer)
  const actual = uniqueSorted(submitted)
  return expected.length === actual.length && expected.every((value, index) => value === actual[index])
}

export function isAnswered(answer: string[] | undefined): boolean {
  return Boolean(answer?.some((item) => item.trim().length > 0))
}
