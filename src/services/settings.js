const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export async function fetchFeatured({ signal } = {}) {
  if (!url || !key) return null
  const response = await fetch(`${url}/rest/v1/site_settings?id=eq.home&select=featured_slugs`, {
    signal,
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!response.ok)
    throw new Error('Não foi possível carregar a seleção de destaques. Tente novamente.')
  const rows = await response.json()
  return rows[0]?.featured_slugs ?? null
}
