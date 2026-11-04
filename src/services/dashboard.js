import { requireSupabase } from './supabase.js'
export async function fetchMessages() {
  const { data, error } = await requireSupabase()
    .from('contact_messages')
    .select('id,name,email,message,created_at,responded_at,email_status')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) throw new Error('Não foi possível carregar as mensagens.')
  return data
}
export async function markResponded(id, answered) {
  const { error } = await requireSupabase()
    .from('contact_messages')
    .update({ responded_at: answered ? new Date().toISOString() : null })
    .eq('id', id)
  if (error) throw new Error('Não foi possível atualizar a mensagem.')
}
export async function saveFeatured(slugs) {
  const { error } = await requireSupabase()
    .from('site_settings')
    .upsert({ id: 'home', featured_slugs: slugs })
  if (error) throw new Error('Não foi possível salvar os destaques.')
}
export async function fetchOwnerFeatured() {
  const { data, error } = await requireSupabase()
    .from('site_settings')
    .select('featured_slugs')
    .eq('id', 'home')
    .maybeSingle()
  if (error) throw new Error('Não foi possível carregar os destaques.')
  return data?.featured_slugs ?? null
}
export async function signOut() {
  const { error } = await requireSupabase().auth.signOut()
  if (error) throw new Error('Não foi possível sair. Tente novamente.')
}
