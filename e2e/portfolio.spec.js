import { test, expect } from '@playwright/test'
const repositories = [
  {
    id: 1,
    name: 'rastro',
    description: 'Acompanhar solicitações sem perder o histórico.',
    language: 'TypeScript',
    updated_at: '2026-11-03T00:00:00Z',
    html_url: 'https://github.com/gitLeonardoFerreira/rastro',
  },
]
test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', (route) => route.fulfill({ json: repositories }))
})
test('rota individual abre diretamente, atualiza e usa o cache ao navegar', async ({ page }) => {
  let calls = 0
  page.on('request', (request) => {
    if (request.url().startsWith('https://api.github.com/')) calls++
  })
  await page.goto('/projetos/rastro')
  await expect(page.getByRole('heading', { name: 'Rastro.', exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Rastro.', exact: true })).toBeVisible()
  const afterReload = calls
  await page.getByRole('link', { name: 'Voltar aos projetos' }).click()
  await expect(page.getByRole('heading', { name: 'Do problema ao projeto.' })).toBeVisible()
  await page.getByRole('link', { name: 'Ver estudo de caso do projeto Rastro' }).click()
  await expect(page.getByRole('heading', { name: 'Rastro.', exact: true })).toBeVisible()
  expect(calls).toBe(afterReload)
})
test('dashboard sem sessão redireciona ao login', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('heading', { name: 'Área do dono.' })).toBeVisible()
  await expect(page.getByText('Mensagens recebidas')).toHaveCount(0)
})
test('rota desconhecida tem recuperação', async ({ page }) => {
  await page.goto('/pagina-inexistente')
  await expect(page.getByRole('heading', { name: 'Essa página saiu de órbita.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Voltar ao início', exact: true })).toBeVisible()
})
test('erro e lista vazia da API são explícitos', async ({ page }) => {
  await page.unroute('https://api.github.com/**')
  await page.route('https://api.github.com/**', (route) =>
    route.fulfill({ status: 403, json: { message: 'rate limit' } }),
  )
  await page.goto('/projetos')
  await expect(page.getByRole('alert')).toContainText('limite')
  await page.unroute('https://api.github.com/**')
  await page.route('https://api.github.com/**', (route) => route.fulfill({ json: [] }))
  await page.getByRole('button', { name: 'Tentar novamente' }).click()
  await expect(
    page.getByRole('heading', { name: 'Ainda não há repositórios públicos.' }),
  ).toBeVisible()
})
test('formulário valida, bloqueia envio e confirma retorno', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await route.fulfill({ json: { saved: true, emailSent: true } })
  })
  await page.goto('/contato')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByText('Informe um e-mail válido.')).toBeVisible()
  await page.getByLabel('Seu nome').fill('Maria')
  await page.getByLabel('Seu e-mail').fill('maria@example.com')
  await page
    .getByLabel('Sua mensagem')
    .fill('Gostaria de conversar sobre uma oportunidade de estágio.')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
  await expect(page.getByRole('status')).toContainText('Mensagem recebida.')
})

test('tema persiste, leitura alternativa funciona e não há overflow horizontal', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Ativar tema escuro' }).click()
  await page.reload()
  await expect(page.getByRole('button', { name: 'Ativar tema claro' })).toBeVisible()
  await page.getByRole('button', { name: 'Modo leitura', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Projetos com propósito.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Modo voo', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
})
test('voo permite avançar e abrir o projeto por link individual', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Próxima cena' }).click()
  await expect(
    page.getByRole('link', { name: 'Ver estudo de caso do projeto Rastro' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Ver estudo de caso do projeto Rastro' }).click()
  await expect(page).toHaveURL(/\/projetos\/rastro$/)
})
