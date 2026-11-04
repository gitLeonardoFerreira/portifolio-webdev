import { test, expect } from '@playwright/test'
const repo = {
  id: 1,
  name: 'rastro',
  description: 'Acompanhar solicitações sem perder o histórico.',
  language: 'TypeScript',
  updated_at: '2026-11-03T00:00:00Z',
  html_url: 'https://github.com/gitLeonardoFerreira/rastro',
}
test('superfícies principais têm conteúdo alcançável e largura responsiva', async ({
  page,
}, testInfo) => {
  await page.route('https://api.github.com/**', (route) => route.fulfill({ json: [repo] }))
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Próxima cena' })).toBeVisible()
  await page.screenshot({ path: `.impeccable/review/home-light-${testInfo.project.name}.png` })
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click()
  await expect(page.getByRole('button', { name: 'Ativar tema claro' })).toBeVisible()
  await expect(
    page
      .locator('.main-nav')
      .getByRole('link', { name: 'Início', exact: true, includeHidden: true }),
  ).toHaveCSS('color', 'rgb(233, 245, 255)')
  await page.screenshot({ path: `.impeccable/review/home-dark-${testInfo.project.name}.png` })
  for (const [route, heading] of [
    ['/projetos', 'Do problema ao projeto.'],
    ['/contato', 'Uma boa ideia começa com uma conversa.'],
  ]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    await expect(
      page.locator('.main-nav').getByRole('link', {
        name: route === '/projetos' ? 'Projetos' : 'Contato',
        exact: true,
        includeHidden: true,
      }),
    ).toHaveAttribute('aria-current', 'page')
    if (route === '/projetos')
      await expect(
        page.getByRole('link', { name: 'Ver estudo de caso do projeto Rastro' }),
      ).toBeVisible()
    else await expect(page.getByRole('button', { name: 'Enviar mensagem' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({
      path: `.impeccable/review/${route.slice(1)}-dark-${testInfo.project.name}.png`,
      fullPage: true,
    })
  }
})
