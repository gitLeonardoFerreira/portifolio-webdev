import { describe, it, expect, vi } from 'vitest'
import { fetchRepositories } from '../src/services/github.js'
const repo = {
  id: 1,
  name: 'novo-projeto',
  description: 'Dados vindos da API',
  language: 'JavaScript',
  updated_at: '2026-11-03T00:00:00Z',
  html_url: 'https://github.com/example/novo-projeto',
}
describe('API do GitHub', () => {
  it('inclui automaticamente um repositório sem cadastro editorial', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([repo]))))
    const result = await fetchRepositories()
    expect(result[0]).toMatchObject({
      slug: 'novo-projeto',
      summary: 'Dados vindos da API',
      language: 'JavaScript',
    })
    vi.unstubAllGlobals()
  })
  it('trata lista vazia sem inventar projetos', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('[]')))
    expect(await fetchRepositories()).toEqual([])
    vi.unstubAllGlobals()
  })
  it('informa limite de requisições sem retry automático', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('{}', { status: 403 }))
    vi.stubGlobal('fetch', fetch)
    await expect(fetchRepositories()).rejects.toThrow('limite')
    expect(fetch).toHaveBeenCalledTimes(1)
    vi.unstubAllGlobals()
  })
  it('exclui forks e arquivos arquivados', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            JSON.stringify([
              repo,
              { ...repo, id: 2, fork: true },
              { ...repo, id: 3, archived: true },
            ]),
          ),
        ),
    )
    expect(await fetchRepositories()).toHaveLength(1)
    vi.unstubAllGlobals()
  })
})
