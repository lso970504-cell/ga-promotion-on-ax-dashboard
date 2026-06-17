create table if not exists public.promo_service_state (
  id bigint primary key check (id = 1),
  selected_month text not null default '2026.06',
  period text not null default '직전 6개월',
  excel_updated_at text not null default '',
  generated_at text not null default '',
  approved_at text not null default '',
  selected_upload_file_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.promo_promotions (
  id bigint primary key,
  code text not null default '',
  agency text not null,
  region text not null default '',
  branch text not null default '',
  rm text not null default '',
  product text not null default '',
  happy_type text not null default '',
  month text not null,
  status text not null check (status in ('확정', '미확정', '오류')),
  error_reason text not null default '',
  generated boolean not null default false,
  notice_file text not null default '',
  updated_at text not null default ''
);

create table if not exists public.promo_template_forms (
  promotion_id bigint primary key references public.promo_promotions(id) on delete cascade,
  form_data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.promo_service_state enable row level security;
alter table public.promo_promotions enable row level security;
alter table public.promo_template_forms enable row level security;

grant select, insert, update, delete on public.promo_service_state to anon, authenticated, service_role;
grant select, insert, update, delete on public.promo_promotions to anon, authenticated, service_role;
grant select, insert, update, delete on public.promo_template_forms to anon, authenticated, service_role;

drop policy if exists "promo_service_state_public_access" on public.promo_service_state;
create policy "promo_service_state_public_access"
on public.promo_service_state
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "promo_promotions_public_access" on public.promo_promotions;
create policy "promo_promotions_public_access"
on public.promo_promotions
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "promo_template_forms_public_access" on public.promo_template_forms;
create policy "promo_template_forms_public_access"
on public.promo_template_forms
for all
to anon, authenticated
using (true)
with check (true);
