-- Run once in a fresh Supabase project. Never store secrets here.
begin;
create table public.portfolio_owners (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.portfolio_owners enable row level security;
revoke all on public.portfolio_owners from anon, authenticated;
create function public.is_owner() returns boolean language sql stable security definer set search_path = '' as $$ select exists(select 1 from public.portfolio_owners where user_id = (select auth.uid())); $$;
revoke all on function public.is_owner() from public;
grant execute on function public.is_owner() to authenticated;
create table public.site_settings (id text primary key check(id='home'), featured_slugs text[] not null default '{}', check(cardinality(featured_slugs) <= 3));
alter table public.site_settings enable row level security;
grant select on public.site_settings to anon, authenticated;
grant insert,update on public.site_settings to authenticated;
create policy "public reads featured" on public.site_settings for select to anon,authenticated using (true);
create policy "owner inserts featured" on public.site_settings for insert to authenticated with check ((select public.is_owner()));
create policy "owner updates featured" on public.site_settings for update to authenticated using ((select public.is_owner())) with check ((select public.is_owner()));
create table public.contact_messages (
 id uuid primary key, name text not null check(char_length(name) between 2 and 80), email text not null check(char_length(email) <= 254), message text not null check(char_length(message) between 20 and 2000), payload_hash text not null,
 created_at timestamptz not null default now(), responded_at timestamptz,
 email_status text not null default 'pending' check(email_status in ('pending','sent','failed'))
);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
grant select on public.contact_messages to authenticated;
grant update (responded_at) on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
create policy "owner reads messages" on public.contact_messages for select to authenticated using ((select public.is_owner()));
create policy "owner responds" on public.contact_messages for update to authenticated using ((select public.is_owner())) with check ((select public.is_owner()));
create index contact_created_at_idx on public.contact_messages (created_at desc);
create table public.contact_rate_limits (key text not null, bucket timestamptz not null, hits int not null default 1, primary key(key,bucket));
alter table public.contact_rate_limits enable row level security;
revoke all on public.contact_rate_limits from anon,authenticated;
create function public.consume_contact_rate(rate_key text) returns boolean language plpgsql security definer set search_path = '' as $$
declare current_hits int;
begin
 insert into public.contact_rate_limits (key,bucket) values (rate_key,date_trunc('hour',now()))
 on conflict (key,bucket) do update set hits = public.contact_rate_limits.hits+1 returning hits into current_hits;
 delete from public.contact_rate_limits where bucket < now()-interval '48 hours';
 return current_hits <= 5;
end; $$;
revoke all on function public.consume_contact_rate(text) from public,anon,authenticated;
grant execute on function public.consume_contact_rate(text) to service_role;
commit;
-- After creating the owner's Auth user via the dashboard, run:
-- insert into public.portfolio_owners(user_id) values ('UUID-DO-DONO');
-- Disable public sign-ups in Auth settings. Only the allowlisted UUID has access even if sign-ups are left on.
