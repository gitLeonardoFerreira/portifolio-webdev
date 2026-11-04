import { afterEach, expect, it, vi } from 'vitest'
afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.resetModules()
})
it('não solicita destaques enquanto os serviços não estão configurados', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', '')
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')
  vi.resetModules()
  const fetch = vi.fn()
  vi.stubGlobal('fetch', fetch)
  const { fetchFeatured } = await import('../src/services/settings.js')
  expect(await fetchFeatured()).toBeNull()
  expect(fetch).not.toHaveBeenCalled()
})
it('envia a chave pública por apikey, sem tratá-la como JWT', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://project.supabase.co')
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_fixture')
  vi.resetModules()
  const fetch = vi
    .fn()
    .mockResolvedValue(new Response(JSON.stringify([{ featured_slugs: ['rastro'] }])))
  vi.stubGlobal('fetch', fetch)
  const { fetchFeatured } = await import('../src/services/settings.js')
  expect(await fetchFeatured()).toEqual(['rastro'])
  expect(fetch.mock.calls[0][1].headers).toEqual({ apikey: 'sb_publishable_fixture' })
})
