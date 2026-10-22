import { beforeEach, describe, expect, it } from 'vitest'
import { clearProgress, emptyProgress, loadProgress, saveProgress } from './storage'

describe('progress storage', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty progress when nothing is stored', () => {
    expect(loadProgress()).toEqual(emptyProgress)
  })

  it('round-trips progress', () => {
    const progress = {
      ...emptyProgress,
      completedCards: { 'sets-1': '2026-10-22T00:00:00.000Z' },
      lastChapterId: 'sets-logic'
    }
    saveProgress(progress)
    expect(loadProgress()).toEqual(progress)
  })

  it('ignores malformed data and supports reset', () => {
    localStorage.setItem('zhishu-progress-v1', '{bad json')
    expect(loadProgress()).toEqual(emptyProgress)
    saveProgress(emptyProgress)
    clearProgress()
    expect(localStorage.getItem('zhishu-progress-v1')).toBeNull()
  })
})
