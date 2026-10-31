create table if not exists public.resume_downloads (
  id bigint generated always as identity primary key,
  email text not null,
  requested_at timestamptz not null default now()
);

alter table public.resume_downloads enable row level security;

revoke all on table public.resume_downloads from anon, authenticated;
