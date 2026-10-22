import { expect, test } from '@playwright/test'

test('loads the app shell from cache after the first visit', async ({ page, context }) => {
  await page.goto('/')
  await page.evaluate(() => navigator.serviceWorker.ready)
  await expect(page.getByRole('heading', { name: /把高中数学/ })).toBeVisible()

  await context.setOffline(true)
  await page.reload()

  await expect(page.getByRole('heading', { name: /把高中数学/ })).toBeVisible()
  await expect(page.getByText('离线模式 · 进度仍会保存')).toBeVisible()
})

test('keeps the offline indicator visible on a phone-sized screen', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => navigator.serviceWorker.ready)

  await context.setOffline(true)
  await page.goto('/#/quiz/comprehensive')

  await expect(page.getByRole('heading', { name: '综合能力卷' })).toBeVisible()
  await expect(page.getByText('离线模式 · 进度仍会保存')).toBeVisible()
})
