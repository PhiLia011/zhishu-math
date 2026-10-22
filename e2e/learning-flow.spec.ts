import { expect, test } from '@playwright/test'

test('learns a card, completes a quiz and opens the result', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /把高中数学/ })).toBeVisible()

  await page.getByRole('link', { name: /开始第一课/ }).click()
  await expect(page.getByRole('heading', { name: '集合与元素' })).toBeVisible()
  await page.getByRole('button', { name: /学完，继续/ }).click()
  await expect(page.getByRole('heading', { name: '集合的表示方法' })).toBeVisible()

  await page.goto('/#/quiz/chapter/sets-logic')
  for (let index = 0; index < 10; index += 1) {
    const numericInput = page.getByLabel('数值答案')
    if (await numericInput.count()) {
      await numericInput.fill('1')
    } else {
      await page.locator('.answer-option').first().click()
    }
    if (index < 9) {
      await page.getByRole('button', { name: '下一题' }).click()
    }
  }
  await page.getByRole('button', { name: /提交试卷/ }).click()
  await expect(page.getByText('测试完成')).toBeVisible()
  await expect(page.getByText('逐题复盘')).toBeVisible()
  await page.getByRole('link', { name: '复习错题' }).click()
  await expect(page.getByRole('heading', { name: '错题本' })).toBeVisible()
})

test('persists a completed learning card after reload', async ({ page }) => {
  await page.goto('/#/chapter/sets-logic/sets-1')
  await page.getByRole('button', { name: /学完，继续/ }).click()
  await page.reload()
  await expect(page.getByText('1/8', { exact: true })).toBeVisible()
})

test('keeps an unfinished quiz answer after reload', async ({ page }) => {
  await page.goto('/#/quiz/chapter/trigonometry')
  await page.locator('.answer-option').first().click()
  await expect(page.getByText('1/10 已答')).toBeVisible()
  await page.reload()
  await expect(page.getByText('1/10 已答')).toBeVisible()
})

test('opens the comprehensive quiz from its direct URL', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.goto('/#/quiz/comprehensive')
  await expect(page.getByRole('heading', { name: '综合能力卷' })).toBeVisible()
  await expect(page.getByText('0/20 已答')).toBeVisible()
  expect(pageErrors).toEqual([])
})
